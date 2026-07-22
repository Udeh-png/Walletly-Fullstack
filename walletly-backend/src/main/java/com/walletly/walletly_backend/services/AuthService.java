package com.walletly.walletly_backend.services;

import com.resend.core.exception.ResendException;
import com.walletly.walletly_backend.dtos.requests.LoginRequest;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.CreatePsaResponse;
import com.walletly.walletly_backend.mappers.Mapper;
import com.walletly.walletly_backend.dtos.requests.RegistrationRequest;
import com.walletly.walletly_backend.dtos.response.UserResponse;
import com.walletly.walletly_backend.exceptions.SessionNotFoundException;
import com.walletly.walletly_backend.exceptions.UserEmailAlreadyExists;
import com.walletly.walletly_backend.modals.Wallet;
import com.walletly.walletly_backend.repos.WalletRepo;
import com.walletly.walletly_backend.security.MyUserDetails;
import com.walletly.walletly_backend.modals.User;
import com.walletly.walletly_backend.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import tools.jackson.core.JsonParser;
import tools.jackson.databind.ObjectMapper;

import javax.security.auth.login.AccountLockedException;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class AuthService {
	@Autowired
	OtpService otpService;
	@Autowired
	FlutterWaveService flutterService;
	
	@Autowired
	UserRepo userRepo;
	@Autowired
	WalletRepo walletRepo;
	
	@Autowired
	BCryptPasswordEncoder passwordEncoder;
	@Autowired
	RedisTemplate<String, String> redisTemplate;
	@Autowired
	ObjectMapper objectMapper;
	@Autowired
	AuthenticationManager authManager;
	
	static final Long SESSION_TTL = 30L;
	
	public String initiateRegistration (RegistrationRequest regInfo) throws ResendException, AccountLockedException {
		String regReqEmail = regInfo.getEmail();
		String id = Optional.ofNullable(getRegId(regReqEmail)).orElseGet(this::generateId);
		
		if (userRepo.existsByEmail(regReqEmail))
			throw new UserEmailAlreadyExists(regReqEmail);
		
		regInfo.setPassword(Objects.requireNonNull(passwordEncoder.encode(regInfo.getPassword())));
		
		storeRegSession(id, regInfo);
		
		String otp = otpService.generateOtp();

		otpService.sendOtp(regReqEmail, otp);
		otpService.storeOtp(otp, regReqEmail);
		
		return id;
	}
	
	public UserResponse verifyRegistration (String otp, String sessionId) throws AccountLockedException {
		RegistrationRequest regRequest = getRegInfo(sessionId);
		
		if (regRequest == null) throw new SessionNotFoundException();
		
		User user = Mapper.regRequestToUser(regRequest);
		String userEmail = user.getEmail();
		
		otpService.verifyOtp(otp, userEmail);
		
		user.setCreatedAt(Instant.now());
		
		User savedUser = userRepo.save(user);
		
		CreatePsaResponse psaResponse = flutterService.createPayoutSubaccount(regRequest);
		Wallet newWallet = Mapper.mapToWallet(savedUser, psaResponse);
		
		walletRepo.save(newWallet);
		
		otpService.resetRedisOtpKeys(userEmail);
		resetRedisRegKeys(sessionId, userEmail);
		
		return Mapper.userToUserResponse(user);
	}
	
	public UserResponse login (LoginRequest request) {
		Authentication auth = authManager
				.authenticate(
						new UsernamePasswordAuthenticationToken(
								request.getEmail(),
								request.getPassword()
						)
				);
		
		MyUserDetails userDetails = (MyUserDetails)auth.getPrincipal();
		assert userDetails != null;
		
		return Mapper.userToUserResponse(userDetails.getUser());
	}
	
	public void resendOtp (String id) throws ResendException, AccountLockedException {
		RegistrationRequest regInfo = getRegInfo(id);
		
		if (regInfo == null) throw new SessionNotFoundException();
		
		String email = regInfo.getEmail();
		String otp = otpService.generateOtp();
		
		try {
			otpService.sendOtp(email, otp);
		} catch (AccountLockedException e) {
			throw new AccountLockedException(e.getMessage());
		}finally {
			otpService.storeOtp(otp, email);
		}
	}
	
	public String generateId () {
		return UUID.randomUUID().toString();
	}
	
	public void storeRegSession (String id, RegistrationRequest regInfo) {
		redisTemplate.opsForValue().set(
				"otp:userInfo:"+ id,
				objectMapper.writeValueAsString(regInfo),
				SESSION_TTL,
				TimeUnit.MINUTES
		);
		redisTemplate.opsForValue().set("otp:sessionId:"+regInfo.getEmail(), id, SESSION_TTL, TimeUnit.MINUTES);
	}
	
	public void resetRedisRegKeys (String id, String email) {
		redisTemplate.delete("otp:userInfo:"+ id);
		redisTemplate.delete("otp:sessionId:"+email);
	}
	
	public RegistrationRequest getRegInfo (String sessionId) {
		String userInfoJson = redisTemplate.opsForValue().get("otp:userInfo:"+sessionId);
		
		if (userInfoJson == null) throw new SessionNotFoundException();
		
		JsonParser parser = objectMapper.createParser(userInfoJson);
		RegistrationRequest userInfo = parser.readValueAs(RegistrationRequest.class);
		parser.close();
		
		return userInfo;
	}
	
	public String getRegId (String email) {
		return redisTemplate.opsForValue().get("otp:sessionId:"+email);
	}
}