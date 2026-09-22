package com.walletly.walletly_backend.services;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.walletly.walletly_backend.exceptions.*;
import jakarta.mail.MessagingException;
import org.jspecify.annotations.NonNull;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisHashCommands;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.data.redis.core.types.Expiration;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import javax.security.auth.login.AccountLockedException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service()
public class OtpService {
	@Autowired
	private RedisTemplate<String, String> redisTemplate;
	@Autowired
	private MailService mailService;
	
	static final int OTP_TTL = 5;
	static final int OTP_REQUESTS_TTL = 30;
	static final int ACCOUNT_LOCK_TTL = 15;
	static final int ATTEMPTS_LIMIT = 10;
	static final int REQUESTS_LIMIT = 5;
	
	public String generateOtp () {
		SecureRandom secureRandom = new SecureRandom();
		int otpInt = secureRandom.nextInt(900000) + 100000;
		return String.valueOf(otpInt);
	}
	
	private String encodeOtp (String otp, String salt) {
		MessageDigest digest = null;
		try {
			digest = MessageDigest.getInstance("SHA-256");
		} catch (NoSuchAlgorithmException e) {
			throw new RuntimeException(e);
		}
		
		String saltedOtp = otp + salt;
		
		byte[] hash = digest.digest(saltedOtp.getBytes(StandardCharsets.UTF_8));
		
		return Base64.getEncoder().encodeToString(hash);
	}
	
	public void storeOtp(String encodedOtp, String email) {
		String salt = UUID.randomUUID().toString();
		
		Map<String, String> otpMap = Map.of("code", encodedOtp, "salt", salt);
		
		redisTemplate.opsForHash()
				.putAndExpire(
						"otp:code:salt:" + email,
						otpMap,
						RedisHashCommands.HashFieldSetOption.UPSERT,
						Expiration.from(Duration.ofMinutes(OTP_TTL))
				);
	}
	
	public void invalidateOtp (String email) {
		redisTemplate.delete("otp:code:salt:"+email);
	}
	
	public void resetRedisKey (String counterKey) {
		redisTemplate.delete(counterKey);
	}
	
	public void resetRedisOtpKeys(String email) {
		redisTemplate.delete(List.of(
				"otp:code:" + email,
				"otp:salt:" + email,
				"otp:attempts:" + email,
				"otp:requests:" + email,
				"otp:requests:cooldown:" + email
				)
		);
	}
	
	public void sendOtp (String email, String otp) throws AccountLockedException, MessagingException, UnsupportedEncodingException {
		final String requestsKey = "otp:requests:" + email;
		final String requestCooldownKey = "otp:requests:cooldown:" + email;
		final String requestLockedKey = "otp:requests:locked:" + email;
		
		List<Object> results = redisTemplate.executePipelined(new SessionCallback<Object>() {
			@Override
			@SuppressWarnings("unchecked")
			public <K, V> Object execute(@NonNull RedisOperations<K, V> operations) throws DataAccessException {
				operations.hasKey((K) requestLockedKey);
				operations.hasKey((K) ("otp:attempts:locked:" + email));
				
				operations.opsForValue().setIfAbsent(
						(K) requestCooldownKey,
						(V) "1",
						Expiration.from(Duration.ofSeconds(70))
				);
				return null;
			}
		});
		
		if (Boolean.TRUE.equals(results.getFirst()) || Boolean.TRUE.equals(results.get(1))) {
			throw new AccountLockedException("Too many verification code requests");
		}
		
		Boolean createdCooldown = (Boolean) results.getLast();
		
		if (Boolean.FALSE.equals(createdCooldown)) throw new CooldownActiveException(redisTemplate.getExpire(requestCooldownKey));
		
		Long requests = redisTemplate.opsForValue().increment(requestsKey); // This creates the key and increments it
		
		long currentReqCount = requests == null ? 0 : requests;
		
		if (currentReqCount == 1) {
			redisTemplate.expire(requestsKey, Expiration.from(Duration.ofMinutes(OTP_REQUESTS_TTL))); // if the key was created add the TTL
		}
		
		if (currentReqCount > REQUESTS_LIMIT) { // Used > so if a prev request incs the key this catches it
			throw new TooManyOtpRequestsException();
		}
		
		mailService.sendEmail(email, otp, "OTP Verification");
		
		if (currentReqCount == REQUESTS_LIMIT) {
			redisTemplate.opsForValue().set(
				requestLockedKey,
				"1",
				Expiration.from(Duration.ofMinutes(ACCOUNT_LOCK_TTL))
			);

			resetRedisKey(requestsKey);
		}
	}
	
	public void verifyOtp (String email, String otp) throws AccountLockedException {
		if (Boolean.TRUE.equals(redisTemplate.hasKey(("otp:attempts:locked:" + email))))
			throw new AccountLockedException("Too many verification code attempts");
		
		final String attemptsKey = "otp:attempts:" + email;
		
		Long attempts = redisTemplate.opsForValue().increment(attemptsKey);
		
		if (attempts != null && attempts == 1) {
			redisTemplate.expire("otp:attempts:" + email, OTP_REQUESTS_TTL, TimeUnit.MINUTES);
		}
		
		long currentAttempts = attempts == null ? 0 : attempts;
		
		if (currentAttempts > ATTEMPTS_LIMIT) {
			throw new TooManyAttemptsException();
		}
		
		if (currentAttempts == ATTEMPTS_LIMIT) {
			redisTemplate.executePipelined(new SessionCallback<Object>() {
				@Override
				@SuppressWarnings("unchecked")
				public <K, V> Object execute(@NonNull RedisOperations<K, V> operations) throws DataAccessException {
					operations.opsForValue().set(
							(K) ("otp:attempts:locked:" + email),
							(V) ("1"),
							Expiration.from(Duration.ofMinutes(ACCOUNT_LOCK_TTL))
					);
					
					operations.opsForValue().set(
							(K) ("otp:requests:locked:" + email),
							(V) ("1"),
							Expiration.from(Duration.ofMinutes(ACCOUNT_LOCK_TTL))
					);
					return null;
				}
			});
			invalidateOtp(email);
			resetRedisKey(attemptsKey);
			throw new TooManyAttemptsException();
		}
		
		Map<Object, Object> otpEntries = redisTemplate.opsForHash().entries("otp:code:salt:" + email);
		
		String storedOtp = (String) otpEntries.get("code");
		
		if (storedOtp == null) throw new OtpHasExpiredException();
		
		String salt = (String) otpEntries.get("salt");
		
		String encodedSentOtp = encodeOtp(otp, salt);
		
		if (!storedOtp.equals(encodedSentOtp)) {
			throw new OtpMissMatchException();
		}
	}
}
