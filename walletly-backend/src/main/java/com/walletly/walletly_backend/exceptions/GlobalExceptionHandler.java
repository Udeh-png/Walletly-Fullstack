package com.walletly.walletly_backend.exceptions;

import com.resend.core.exception.ResendException;
import com.walletly.walletly_backend.dtos.response.ErrorResponse;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.net.SocketTimeoutException;
import java.net.UnknownHostException;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(UserEmailAlreadyExists.class)
	public ResponseEntity<@NonNull ErrorResponse> handleEmailExist (UserEmailAlreadyExists eae) {
		ErrorResponse er = new ErrorResponse(eae.getMessage(),"EMAIL_EXISTS");
		
		return ResponseEntity
				.status(HttpStatus.CONFLICT)
				.body(er);
	}
	
	@ExceptionHandler(SocketTimeoutException.class)
	public ResponseEntity<@NonNull ErrorResponse> handleSocketTimeout (ResendException e) {
		ErrorResponse er = new ErrorResponse("Network unreachable. Check your internet connection Nigger", "TIMEOUT");
		return ResponseEntity
				.status(HttpStatus.GATEWAY_TIMEOUT)
				.body(er);
	}
	
	@ExceptionHandler(UnknownHostException.class)
	public ResponseEntity<@NonNull ErrorResponse> unknownHostHandler (UnknownHostException uhe) {
		ErrorResponse er = new ErrorResponse("The connection is taking too long. Please check your internet and try again.", "NETWORK");
		return ResponseEntity
				.status(HttpStatus.SERVICE_UNAVAILABLE)
				.body(er);
	}
	
	@ExceptionHandler(ResendException.class)
	public ResponseEntity<@NonNull ErrorResponse> resendExceptionHandler (ResendException re) {
		ErrorResponse er = new ErrorResponse(re.getMessage(), null);
		
		return ResponseEntity
				.internalServerError()
				.body(er);
	}
	
	@ExceptionHandler(OtpMissMatchException.class)
	public ResponseEntity<@NonNull ErrorResponse> wrongOtpHandler (OtpMissMatchException ome) {
		ErrorResponse er = new ErrorResponse(ome.getMessage(), "OTP_MISMATCH");
		
		return ResponseEntity.badRequest().body(er);
	}
	
	@ExceptionHandler(OtpHasExpiredException.class)
	public ResponseEntity<@NonNull ErrorResponse> otpHasExpired (OtpHasExpiredException ohe) {
		ErrorResponse er = new ErrorResponse(ohe.getMessage(), "EXPIRED_OTP");
		
		return ResponseEntity.status(HttpStatus.GONE).body(er);
	}
	
	@ExceptionHandler(SessionNotFoundException.class)
	public ResponseEntity<@NonNull ErrorResponse> userSessionNotFound (SessionNotFoundException snf) {
		ErrorResponse er = new ErrorResponse(snf.getMessage(), "SESSION_NOT_FOUND");
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(er);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<@NonNull ErrorResponse> invalidHandlerArg (MethodArgumentNotValidException manv) {
		ErrorResponse er = new ErrorResponse("Bad Request Nigga!!!" + manv.getMessage(), "BAD_REQUEST");
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(er);
	}
	
	@ExceptionHandler(OtpSessionStillActiveException.class)
	public ResponseEntity<@NonNull ErrorResponse> otpStillActive (OtpSessionStillActiveException ossa) {
		ErrorResponse er = new ErrorResponse(ossa.getMessage(), "SESSION_STILL_ACTIVE");
		
		return ResponseEntity.status(HttpStatus.CONFLICT).body(er);
	}
	
	@ExceptionHandler(InvalidCredentialsException.class)
	public ResponseEntity<@NonNull ErrorResponse> invalidCredentials (InvalidCredentialsException ice) {
		ErrorResponse er = new ErrorResponse(ice.getMessage(), "INVALID_CREDENTIALS");
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(er);
	}
}