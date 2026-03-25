package com.walletly.walletly_backend.controllers;

import com.resend.core.exception.ResendException;
import com.walletly.walletly_backend.dtos.response.JwtTokenResponse;
import com.walletly.walletly_backend.dtos.requests.ValidateUserRequest;
import com.walletly.walletly_backend.dtos.response.OtpResponse;
import com.walletly.walletly_backend.dtos.requests.RegisterRequest;
import com.walletly.walletly_backend.exceptions.UserSessionNotFoundException;
import com.walletly.walletly_backend.services.*;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequestMapping("/auth")
@RestController()

public class AuthController {
	@Autowired
	SignUpService signUpService;
	
	@PostMapping("/register")
	public ResponseEntity<@NonNull OtpResponse> register (@Valid @RequestBody RegisterRequest user) throws ResendException, UserSessionNotFoundException {
		OtpResponse otpResponse = signUpService.takeInfoVerifyEmail(user);
		return ResponseEntity.ok(otpResponse);
	}
	
	@GetMapping("/resend-otp/{email}")
	public ResponseEntity<@NonNull OtpResponse> resendOtp (@PathVariable String email) throws ResendException, UserSessionNotFoundException {
		OtpResponse response = signUpService.resendOtp(email);
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/validate-user")
	public ResponseEntity<@NonNull JwtTokenResponse> validateUser (@Valid @RequestBody ValidateUserRequest validateOtp, HttpServletResponse response) throws UserSessionNotFoundException {
		JwtTokenResponse tokenDto = signUpService.validateUser(validateOtp.getEmail(), validateOtp.getOtp(), response);
		
		return ResponseEntity.ok(tokenDto);
	}
}