package com.walletly.walletly_backend.controllers;

import com.walletly.walletly_backend.utils.*;
import com.walletly.walletly_backend.services.*;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RestController()
public class SignUpController {
	@Autowired
	SignUpService signUpService;
	
	@PostMapping("/sign-up/verify-email")
	public ResponseEntity<@NonNull OtpResponse> verifyOtp (@RequestBody TempUser user) {
		OtpResponse otpResponse = signUpService.sendSignUpOtp(user);
		return ResponseEntity.ok(otpResponse);
	}
}
