package com.walletly.walletly_backend.exceptions;

public class TooManyOtpRequestsException extends RuntimeException {
	public TooManyOtpRequestsException(String timeLeft) {
		super("Too requests try again in " + timeLeft);
	}
}
