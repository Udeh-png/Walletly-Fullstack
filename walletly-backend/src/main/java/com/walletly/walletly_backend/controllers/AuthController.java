package com.walletly.walletly_backend.controllers;

import com.resend.core.exception.ResendException;
import com.walletly.walletly_backend.dtos.JwtTokenResponse;
import com.walletly.walletly_backend.dtos.ValidateUserRequest;
import com.walletly.walletly_backend.dtos.OtpResponse;
import com.walletly.walletly_backend.dtos.RegisterRequest;
import com.walletly.walletly_backend.services.*;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequestMapping("/auth")
@RestController()

public class AuthController {
	@Autowired
	SignUpService signUpService;
	
	@PostMapping("/register")
	public ResponseEntity<@NonNull OtpResponse> register (@Valid @RequestBody RegisterRequest user) throws ResendException {
		OtpResponse otpResponse = signUpService.sendSignUpOtp(user);
		return ResponseEntity.ok(otpResponse);
	}
	
	@GetMapping("/resend-otp/{email}")
	public ResponseEntity<@NonNull OtpResponse> resendOtp (@PathVariable String email) throws ResendException {
		OtpResponse response = signUpService.resendOtp(email);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/authorize-otp-page-access/{tempUserId}")
	public ResponseEntity<@NonNull String> authorizeOtpPageAccess (@PathVariable String tempUserId) {
		Boolean exists = signUpService.authorizeOtpPageAccess(tempUserId);
		
		if (exists) return ResponseEntity.status(HttpStatus.OK).build();
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
	
	@PostMapping("/validate-user")
	public ResponseEntity<@NonNull JwtTokenResponse> validateUser (@Valid @RequestBody ValidateUserRequest validateOtp, HttpServletResponse response) {
		JwtTokenResponse tokenDto = signUpService.validateUser(validateOtp.getEmail(), validateOtp.getOtp(), response);
		
		return ResponseEntity.ok(tokenDto);
	}
}