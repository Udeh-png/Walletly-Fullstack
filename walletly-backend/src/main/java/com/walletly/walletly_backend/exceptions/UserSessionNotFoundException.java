package com.walletly.walletly_backend.exceptions;

public class UserSessionNotFoundException extends RuntimeException {
	public UserSessionNotFoundException() {
		super("Your email is not in memory");
	}
}
