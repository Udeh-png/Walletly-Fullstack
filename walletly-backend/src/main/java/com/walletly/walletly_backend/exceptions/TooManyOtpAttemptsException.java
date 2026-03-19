package com.walletly.walletly_backend.exceptions;

public class TooManyOtpAttemptsException extends RuntimeException {
	public TooManyOtpAttemptsException() {
		super("You have made too many attempts! Request for a new OTP");
	}
}
