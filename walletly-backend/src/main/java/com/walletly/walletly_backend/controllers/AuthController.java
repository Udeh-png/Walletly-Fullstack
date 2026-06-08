package com.walletly.walletly_backend.controllers;

import com.resend.core.exception.ResendException;
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
	
	@GetMapping("/resend-otp")
	public ResponseEntity<@NonNull OtpResponse> resendOtp (@RequestBody ResendOtpRequest resendReq) throws ResendException {
		OtpResponse response = authService.resendOtp(resendReq.getEmail());
		return ResponseEntity.ok(response);
	}

//	@PostMapping("/validate-user")
//	public ResponseEntity<@NonNull JwtTokenResponse> validateUser (@Valid @RequestBody ValidateUserRequest validateOtp) throws SessionNotFoundException {
//		JwtTokenResponse tokenDto = authService.createUser(validateOtp.getEmail(), validateOtp.getOtp());
//
//		return ResponseEntity.ok(tokenDto);
//	}

//	@PostMapping("authenticate-user")
//	public ResponseEntity<@NonNull JwtTokenResponse> validateUser (@RequestBody LoginRequest loginRequest) {
//		JwtTokenResponse tokenResponse = authService.authenticateUser(loginRequest);
//
//		return ResponseEntity.ok(tokenResponse);
//	}
}