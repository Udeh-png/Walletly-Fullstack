package com.walletly.walletly_backend.services;

import com.resend.core.exception.ResendException;
import com.walletly.walletly_backend.Mappers.Mapper;
import com.walletly.walletly_backend.dtos.requests.RegistrationRequest;
import com.walletly.walletly_backend.dtos.response.OtpResponse;
import com.walletly.walletly_backend.dtos.response.UserResponse;
import com.walletly.walletly_backend.exceptions.SessionNotFoundException;
import com.walletly.walletly_backend.exceptions.UserEmailAlreadyExists;
import com.walletly.walletly_backend.modals.User;
import com.walletly.walletly_backend.repos.UserRepo;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import tools.jackson.core.JsonParser;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class AuthService {
	@Autowired
	OtpService otpService;
	@Autowired
	UserRepo userRepo;
	@Autowired
	JwtService jwtService;
	@Autowired
	BCryptPasswordEncoder passwordEncoder;
	@Autowired
	RedisTemplate<String, String> redisTemplate;
	@Autowired
	ObjectMapper objectMapper;
	
	static final Long SESSION_TTL = 30L;
	
	public OtpResponse initiateRegistration (RegistrationRequest regInfo) throws ResendException {
		String regReqEmail = regInfo.getEmail();
		String id = Optional.ofNullable(getRegId(regReqEmail)).orElseGet(this::generateId);
		
		if (userRepo.existsByEmail(regReqEmail))
			throw new UserEmailAlreadyExists(regReqEmail);
		
		storeRegSession(id, regInfo);
		
		if (otpService.hasLiveOtp(id)) return null;
		
		String otp = otpService.generateOtp();

		otpService.sendOtp(regReqEmail, otp);

		Long otpStoreTime = otpService.storeOtp(id, otp);
		return new OtpResponse(id, otpStoreTime);
	}
	
	public OtpResponse resendOtp (String email) throws ResendException{
		String regId = getRegId(email);
		
		if (regId == null) throw new SessionNotFoundException();
		
		if (otpService.hasLiveOtp(regId)) throw new RuntimeException();
		
		String otp = otpService.generateOtp();
		
		otpService.sendOtp(email, otp);
		
		Long otpGenerationTime = otpService.storeOtp(regId, otp);
		
		return new OtpResponse(regId, otpGenerationTime);
	}
	
	public UserResponse verifyRegistration (String otp, String sessionId, HttpServletResponse response) {
		otpService.verifyOtp(sessionId, otp);
		
		User user = Mapper.regRequestToUser(getRegInfo(sessionId));
		
		user.setPassword(Objects.requireNonNull(passwordEncoder.encode(user.getPassword())));
		
		user.setCreatedAt(LocalDateTime.now());
		
		userRepo.save(user);
		
		Cookie jwtCookie = new Cookie("jwt-token", jwtService.generateAccessToken(user.getId()));
		
		jwtCookie.setHttpOnly(true);
		jwtCookie.setMaxAge(60 * 20);
		jwtCookie.setAttribute("SameSite", "Strict");
		
		response.addCookie(jwtCookie);
		
		otpService.deleteOtpSession(sessionId);
		
		deleteRegSession(sessionId, user.getEmail());
		
		return Mapper.userToUserResponse(user);
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
	
	public void deleteRegSession (String id, String email) {
		redisTemplate.opsForValue().getAndDelete("otp:userInfo:"+ id);
		redisTemplate.opsForValue().getAndDelete("otp:sessionId:"+email);
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