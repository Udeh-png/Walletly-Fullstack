package com.walletly.walletly_backend.exceptions;

import com.resend.core.exception.ResendException;
import com.walletly.walletly_backend.utils.ErrorResponse;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.net.SocketTimeoutException;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(UserEmailAlreadyExists.class)
	public ResponseEntity<@NonNull ErrorResponse> handleEmailExist (UserEmailAlreadyExists eae) {
		ErrorResponse er = new ErrorResponse();
		er.setMessage(eae.getMessage());
		er.setType("EMAIL_EXISTS");
		return ResponseEntity
				.status(HttpStatus.CONFLICT)
				.body(er);
	}
	
	@ExceptionHandler(NotAuthorizedException.class)
	public ResponseEntity<@NonNull ErrorResponse> handleUnauthorized (NotAuthorizedException nae) {
		ErrorResponse er = new ErrorResponse();
		er.setMessage(nae.getMessage());
		er.setType("SUSPENDED");
		return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.body(er);
	}
	
	@ExceptionHandler(AccountSuspendedException.class)
	public ResponseEntity<@NonNull ErrorResponse> handleUnauthorized (AccountSuspendedException ase) {
		ErrorResponse er = new ErrorResponse();
		er.setMessage(ase.getMessage());
		er.setType("SUSPENDED");
		return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.body(er);
	}
	
	@ExceptionHandler(SocketTimeoutException.class)
	public ResponseEntity<@NonNull ErrorResponse> handleSocketTimeout (ResendException e) {
		ErrorResponse er = new ErrorResponse();
		er.setMessage("Network unreachable. Check your internet connection Nigger");
		er.setType("TIMEOUT");
		return ResponseEntity
				.status(HttpStatus.GATEWAY_TIMEOUT)
				.body(er);
	}
	
	@ExceptionHandler(UnknownHostException.class)
	public ResponseEntity<@NonNull ErrorResponse> unknownHostHandler (UnknownHostException uhe) {
		ErrorResponse er = new ErrorResponse();
		er.setMessage("The connection is taking too long. Please check your internet and try again.");
		er.setType("UNKNOWN");
		return ResponseEntity
				.status(HttpStatus.SERVICE_UNAVAILABLE)
				.body(er);
	}
	
	@ExceptionHandler(ResendException.class)
	public ResponseEntity<@NonNull ErrorResponse> resendExceptionHandler (ResendException re) {
		ErrorResponse er = new ErrorResponse();
		er.setMessage(re.getMessage());
		return ResponseEntity
				.internalServerError()
				.body(er);
	}
}