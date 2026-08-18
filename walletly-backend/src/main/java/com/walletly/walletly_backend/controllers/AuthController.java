package com.walletly.walletly_backend.controllers;

import com.walletly.walletly_backend.dtos.requests.LoginRequest;
import com.walletly.walletly_backend.dtos.requests.RegistrationRequest;
import com.walletly.walletly_backend.dtos.requests.VerifyEmailRequest;
import com.walletly.walletly_backend.dtos.response.UserResponse;
import com.walletly.walletly_backend.exceptions.OtpMissMatchException;
import com.walletly.walletly_backend.exceptions.SessionNotFoundException;
import com.walletly.walletly_backend.modals.User;
import com.walletly.walletly_backend.services.*;
import com.walletly.walletly_backend.utils.CookieType;
import com.walletly.walletly_backend.utils.CookiesUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import javax.security.auth.login.AccountLockedException;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/api/auth")
@RestController

public class AuthController {
	@Autowired
	AuthService authService;
	@Autowired
	JwtService jwtService;
	
	@PostMapping("/registration/initiate")
	public ResponseEntity<?> initiateRegistration (@Valid @RequestBody RegistrationRequest regRequest, HttpServletResponse response) throws SessionNotFoundException, AccountLockedException {
		String id = authService.initiateRegistration(regRequest);
		ResponseCookie cookie = ResponseCookie.from("regId", id)
				.httpOnly(true)
				.secure(false)
				.path("/")
				.maxAge(30 * 60)
				.sameSite("Lax")
				.build();
		
		return ResponseEntity.ok()
				.header(HttpHeaders.SET_COOKIE, cookie.toString())
				.build();
	}
	
	@PostMapping("/registration/verify")
	public ResponseEntity<@NonNull UserResponse> verifyRegistration (@Valid @RequestBody VerifyEmailRequest verificationRequest, HttpServletRequest request, HttpServletResponse response) throws AccountLockedException {
		Cookie idCookie = WebUtils.getCookie(request, "regId");
		
		if (idCookie == null) throw new SessionNotFoundException();
		
		UserResponse userResponse = authService.verifyRegistration(verificationRequest.getOtp(), idCookie.getValue());
		
		CookiesUtil.createJwtCookies(response, CookieType.ACCESS_TOKEN, jwtService.generateAccessToken(userResponse));
		CookiesUtil.createJwtCookies(response, CookieType.REFRESH_TOKEN, jwtService.generateRefreshToken(userResponse));
		
		idCookie.setMaxAge(0);
		
		return ResponseEntity.ok()
				.header(HttpHeaders.SET_COOKIE, idCookie.toString())
				.build();
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login (@RequestBody LoginRequest request, HttpServletResponse response) {
		UserResponse userResponse = authService.login(request);
		
		CookiesUtil.createJwtCookies(response, CookieType.ACCESS_TOKEN, jwtService.generateAccessToken(userResponse));
		CookiesUtil.createJwtCookies(response, CookieType.REFRESH_TOKEN, jwtService.generateRefreshToken(userResponse));
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/registration/resend-otp")
	public ResponseEntity<?> resendOtp (HttpServletRequest request) throws AccountLockedException {
		Cookie idCookie = WebUtils.getCookie(request, "regId");
		
		if (idCookie == null) throw new SessionNotFoundException();
		
		authService.resendOtp(idCookie.getValue());
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotPassword (@RequestBody Map<String, String> userEmail, HttpServletResponse response) throws AccountLockedException {
		String sessionId = authService.forgotPassword(userEmail.get("email"));
		
		ResponseCookie cookie = ResponseCookie.from("RESET_PASSWORD_SESSION_ID", sessionId)
				.httpOnly(true)
				.secure(false)
				.path("/")
				.maxAge(30 * 60)
				.sameSite("Lax")
				.build();
		
		return ResponseEntity.ok()
				.header(HttpHeaders.SET_COOKIE, cookie.toString())
				.build();
	}
	
	@PostMapping("/resend-otp")
	public ResponseEntity<?> resendPasswordOtp (HttpServletRequest request) throws AccountLockedException {
		Cookie sessionIdCookie = WebUtils.getCookie(request, "RESET_PASSWORD_SESSION_ID");
		if (sessionIdCookie == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		authService.resendPasswordOtp(sessionIdCookie.getValue());
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/verify-otp")
	public ResponseEntity<?> verifyOtp (@RequestBody HashMap<String, String> otpMap, HttpServletRequest request, HttpServletResponse response) throws AccountLockedException {
		Cookie sessionIdCookie = WebUtils.getCookie(request, "RESET_PASSWORD_SESSION_ID");
		if (sessionIdCookie == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		System.out.println(otpMap.get("otp"));
		System.out.println(otpMap);
		
		UserResponse userResponse = authService.verifyOtp(sessionIdCookie.getValue(), otpMap.get("otp"));
		
		CookiesUtil.createJwtCookies(response, CookieType.ACCESS_TOKEN, jwtService.generateAccessToken(userResponse));
		CookiesUtil.createJwtCookies(response, CookieType.REFRESH_TOKEN, jwtService.generateRefreshToken(userResponse));
		
		sessionIdCookie.setMaxAge(0);
		
		return ResponseEntity.ok()
				.header(HttpHeaders.SET_COOKIE, sessionIdCookie.toString())
				.build();
	}
	
	@PostMapping("/reset-password")
	public ResponseEntity<?> resetPassword (@RequestBody Map<String, String> passwordMap, HttpServletRequest request) throws AccountLockedException {
		Cookie accessTokenCookie = WebUtils.getCookie(request, CookieType.ACCESS_TOKEN.getName());
		
		if (accessTokenCookie == null) throw new RuntimeException();
		
		String userId = jwtService.extractClaim(accessTokenCookie.getValue(), Claims::getSubject);
		
		authService.resetPassword(passwordMap.get("password"), userId);
		
		System.out.println("password reset");
		return new ResponseEntity<>(HttpStatus.OK);
	}
}