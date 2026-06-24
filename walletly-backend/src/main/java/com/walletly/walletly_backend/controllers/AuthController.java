package com.walletly.walletly_backend.controllers;

import com.resend.core.exception.ResendException;
import com.walletly.walletly_backend.dtos.requests.LoginRequest;
import com.walletly.walletly_backend.dtos.requests.RegistrationRequest;
import com.walletly.walletly_backend.dtos.requests.ResendOtpRequest;
import com.walletly.walletly_backend.dtos.requests.VerifyEmailRequest;
import com.walletly.walletly_backend.dtos.response.UserResponse;
import com.walletly.walletly_backend.exceptions.SessionNotFoundException;
import com.walletly.walletly_backend.services.*;
import com.walletly.walletly_backend.utils.CookieType;
import com.walletly.walletly_backend.utils.CookiesUtil;
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

@RequestMapping("/api/auth")
@RestController()

public class AuthController {
	@Autowired
	AuthService authService;
	@Autowired
	JwtService jwtService;
	
	@PostMapping("/register/initiate")
	public ResponseEntity<?> initiateRegistration (@Valid @RequestBody RegistrationRequest regRequest, HttpServletResponse response) throws ResendException, SessionNotFoundException, AccountLockedException {
		String id = authService.initiateRegistration(regRequest);
		ResponseCookie cookie = ResponseCookie.from("name", "value")
				.domain("localhost")
				.httpOnly(true)
				.secure(false) // Set to true in production with HTTPS
				.path("/")
				.maxAge(7 * 24 * 60 * 60)
				.sameSite("Lax") // Crucial for cross-origin localhost requests
				.build();
		
		response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/register/verify")
	public ResponseEntity<@NonNull UserResponse> verifyRegistration (@Valid @RequestBody VerifyEmailRequest verificationRequest, HttpServletRequest request, HttpServletResponse response) throws AccountLockedException {
		Cookie idCookie = WebUtils.getCookie(request, "reqId");
		
		if (idCookie == null) throw new SessionNotFoundException();
		
		UserResponse userResponse = authService.verifyRegistration(verificationRequest.getOtp(), idCookie.getValue());
		
		CookiesUtil.createJwtCookies(response, CookieType.ACCESS_TOKEN, jwtService.generateAccessToken(userResponse));
		CookiesUtil.createJwtCookies(response, CookieType.REFRESH_TOKEN, jwtService.generateRefreshToken(userResponse));
		
		return ResponseEntity.ok(userResponse);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login (@RequestBody LoginRequest request, HttpServletResponse response) {
		UserResponse userResponse = authService.login(request);
		
		CookiesUtil.createJwtCookies(response, CookieType.ACCESS_TOKEN, jwtService.generateAccessToken(userResponse));
		CookiesUtil.createJwtCookies(response, CookieType.REFRESH_TOKEN, jwtService.generateRefreshToken(userResponse));
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/resend-otp")
	public ResponseEntity<@NonNull String> resendOtp (@RequestBody ResendOtpRequest resendReq) throws ResendException, AccountLockedException {
		authService.resendOtp(resendReq.getEmail());
		return ResponseEntity.ok("OTP sent to " + resendReq.getEmail() + ". Check your inbox");
	}
}