package com.walletly.walletly_backend.exceptions;

import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(UserEmailAlreadyExists.class)
	public ResponseEntity<@NonNull String> handleEmailExist (UserEmailAlreadyExists e) {
		return ResponseEntity
				.status(HttpStatus.CONFLICT)
				.body(e.getMessage());
	}
	
	@ExceptionHandler(NotAuthorized.class)
	public ResponseEntity<@NonNull String> handleUnauthorized (NotAuthorized e) {
		return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.body(e.getMessage());
	}
	
	@ExceptionHandler(AccountSuspendedException.class)
	public ResponseEntity<@NonNull String> handleUnauthorized (AccountSuspendedException e) {
		return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.body(e.getMessage());
	}
	
	@ExceptionHandler(TooManyOtpRequestsException.class)
	public ResponseEntity<@NonNull String> handleUnauthorized (TooManyOtpRequestsException e) {
		return ResponseEntity
				.status(HttpStatus.TOO_MANY_REQUESTS)
				.body(e.getMessage());
	}
}
