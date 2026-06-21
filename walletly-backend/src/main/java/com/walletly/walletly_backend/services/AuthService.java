package com.walletly.walletly_backend.services;

import com.resend.core.exception.ResendException;
import com.walletly.walletly_backend.dtos.requests.LoginRequest;
import com.walletly.walletly_backend.mappers.Mapper;
import com.walletly.walletly_backend.dtos.requests.RegistrationRequest;
import com.walletly.walletly_backend.dtos.response.InitiateRegResponse;
import com.walletly.walletly_backend.dtos.response.UserResponse;
import com.walletly.walletly_backend.exceptions.SessionNotFoundException;
import com.walletly.walletly_backend.exceptions.UserEmailAlreadyExists;
import com.walletly.walletly_backend.security.MyUserDetails;
import com.walletly.walletly_backend.modals.User;
import com.walletly.walletly_backend.repos.UserRepo;
import com.walletly.walletly_backend.utils.CookieType;
import com.walletly.walletly_backend.utils.CookiesUtil;
import jakarta.servlet.http.HttpServletResponse;
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
import java.time.LocalDateTime;
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
	@Autowired
	AuthenticationManager authManager;
	
	static final Long SESSION_TTL = 30L;
	
	public InitiateRegResponse initiateRegistration (RegistrationRequest regInfo) throws ResendException, AccountLockedException {
		String regReqEmail = regInfo.getEmail();
		String id = Optional.ofNullable(getRegId(regReqEmail)).orElseGet(this::generateId);
		
		if (userRepo.existsByEmail(regReqEmail))
			throw new UserEmailAlreadyExists(regReqEmail);
		
		storeRegSession(id, regInfo);
		
		String otp = otpService.generateOtp();

		otpService.sendOtp(regReqEmail, otp);
		return new InitiateRegResponse(id);
	}
	
	public UserResponse verifyRegistration (String otp, String sessionId, HttpServletResponse response) throws AccountLockedException {
		RegistrationRequest regRequest = getRegInfo(sessionId);
		
		if (regRequest == null) throw new SessionNotFoundException();
		
		User user = Mapper.regRequestToUser(regRequest);
		String userEmail = user.getEmail();
		
		otpService.verifyOtp(otp, userEmail);
		
		user.setPassword(Objects.requireNonNull(passwordEncoder.encode(user.getPassword())));
		
		user.setCreatedAt(LocalDateTime.now());
		
		userRepo.save(user);
		
		CookiesUtil.createJwtCookies(response, CookieType.ACCESS_TOKEN, jwtService.generateAccessToken(user));
		CookiesUtil.createJwtCookies(response, CookieType.REFRESH_TOKEN, jwtService.generateRefreshToken(user));
		
		otpService.resetRedisOtpKeys(userEmail);
		resetRegRedisKeys(sessionId, userEmail);
		
		return Mapper.userToUserResponse(user);
	}
	
	public void login (LoginRequest request, HttpServletResponse response) {
		Authentication auth = authManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		if (auth.isAuthenticated()) {
			MyUserDetails userDetails = (MyUserDetails)auth.getPrincipal();
			assert userDetails != null;
			User user = userDetails.getUser();
			
			CookiesUtil.createJwtCookies(response, CookieType.ACCESS_TOKEN, jwtService.generateAccessToken(user));
			CookiesUtil.createJwtCookies(response, CookieType.REFRESH_TOKEN, jwtService.generateRefreshToken(user));
		}
	}
	
	public void resendOtp (String email) throws ResendException, AccountLockedException {
		String regId = getRegId(email);
		
		if (regId == null) throw new SessionNotFoundException();
		
		String otp = otpService.generateOtp();
		
		try {
			otpService.sendOtp(email, otp);
		} catch (AccountLockedException e) {
			otpService.storeOtp(otp, email);
			throw new AccountLockedException(e.getMessage());
		}
		
		otpService.storeOtp(otp, email);
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
	
	public void resetRegRedisKeys (String id, String email) {
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