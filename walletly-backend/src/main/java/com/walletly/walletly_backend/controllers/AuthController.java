package com.walletly.walletly_backend.controllers;

import com.resend.core.exception.ResendException;
import com.walletly.walletly_backend.dtos.requests.LoginRequest;
import com.walletly.walletly_backend.dtos.requests.RegistrationRequest;
import com.walletly.walletly_backend.dtos.requests.ResendOtpRequest;
import com.walletly.walletly_backend.dtos.requests.VerifyEmailRequest;
import com.walletly.walletly_backend.dtos.response.OtpResponse;
import com.walletly.walletly_backend.dtos.response.UserResponse;
import com.walletly.walletly_backend.exceptions.SessionNotFoundException;
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
	AuthService authService;
	
	@PostMapping("/register/initiate")
	public ResponseEntity<@NonNull OtpResponse> initiateRegistration (@Valid @RequestBody RegistrationRequest regRequest) throws ResendException, SessionNotFoundException {
		OtpResponse otpResponse = authService.initiateRegistration(regRequest);
		return ResponseEntity.ok(otpResponse);
	}
	
	@PostMapping("/register/verify")
	public ResponseEntity<@NonNull UserResponse> verifyRegistration (@Valid @RequestBody VerifyEmailRequest request, HttpServletResponse response) {
		return ResponseEntity.ok(authService.verifyRegistration(request.getOtp(), request.getId(), response));
	}
	
	@PostMapping("/login")
	public void login (@RequestBody LoginRequest request, HttpServletResponse response) {
		authService.login(request, response);
	}
	
	@GetMapping("/resend-otp")
	public ResponseEntity<@NonNull OtpResponse> resendOtp (@RequestBody ResendOtpRequest resendReq) throws ResendException {
		OtpResponse response = authService.resendOtp(resendReq.getEmail());
		return ResponseEntity.ok(response);
	}
}