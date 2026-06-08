package com.walletly.walletly_backend.services;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.walletly.walletly_backend.exceptions.OtpHasExpiredException;
import com.walletly.walletly_backend.exceptions.OtpMissMatchException;
import com.walletly.walletly_backend.exceptions.SessionNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.concurrent.TimeUnit;

import static com.walletly.walletly_backend.services.AuthService.SESSION_TTL;

@Service()
public class OtpService {
	@Autowired
	Resend resend;
	@Autowired
	RedisTemplate<String, String> redisTemplate;
	
	static final Long OTP_TTL = 5L;
	
	public String generateOtp () {
		SecureRandom secureRandom = new SecureRandom();
		int otpInt = secureRandom.nextInt(900000) + 100000;
		return String.valueOf(otpInt);
	}
	
	public Long storeOtp(String id, String otp) {
		redisTemplate.opsForValue().set("otp:code:"+id,otp, OTP_TTL, TimeUnit.MINUTES);
		return System.currentTimeMillis();
	}
	
	public void deleteOtpSession (String id) {
		redisTemplate.opsForValue().getAndDelete("otp:code:"+id);
	}
	
	public void sendOtp (String email, String otp) throws ResendException {
		CreateEmailOptions emailOptions = CreateEmailOptions.builder()
				.from("onboarding@resend.dev")
				.to(email)
				.subject("Otp Verification")
				.text(otp)
				.build();
		
		resend.emails().send(emailOptions);
	}
	
	public boolean hasLiveOtp(String id) {
		return redisTemplate.opsForValue().get("otp:code:"+id) != null;
	}
	
	public void verifyOtp (String sessionId, String sentOtp) {
		String codeKey = "otp:code:" + sessionId;
		String storedOtp = redisTemplate.opsForValue().get(codeKey);
		
		if (storedOtp == null)
			throw new OtpHasExpiredException();
		
		if (!storedOtp.equals(sentOtp)) {
			throw new OtpMissMatchException();
		}
	}
}
