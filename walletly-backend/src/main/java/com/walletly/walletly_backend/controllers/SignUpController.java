package com.walletly.walletly_backend.controllers;

import com.resend.core.exception.ResendException;
import com.walletly.walletly_backend.utils.*;
import com.walletly.walletly_backend.services.*;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController()
public class SignUpController {
	@Autowired
	SignUpService signUpService;
	
	@PostMapping("/register")
	public ResponseEntity<@NonNull OtpResponse> register (@RequestBody TempUser user) throws ResendException {
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
}
