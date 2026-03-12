package com.walletly.walletly_backend.exceptions;

public class AccountSuspendedException extends RuntimeException {
	public AccountSuspendedException(String message, Throwable cause) {
		super(message, cause);
	}
}
