package com.walletly.walletly_backend.controllers;

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
	public ResponseEntity<@NonNull OtpResponse> register (@RequestBody TempUser user) {
		OtpResponse otpResponse = signUpService.sendSignUpOtp(user);
		return ResponseEntity.ok(otpResponse);
	}
	
	@PostMapping("/resend-otp")
	public ResponseEntity<@NonNull OtpResponse> resendOtp (@RequestBody String email) {
		return ResponseEntity.ok(signUpService.resendOtp(email));
	}
	
	@GetMapping("/validate")
	public ResponseEntity<@NonNull String> validate (@RequestBody String tempUserId) {
		Boolean exists = signUpService.authorizeOtpPageAccess(tempUserId);
		
		if (exists) return ResponseEntity.ok().build();
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
}
