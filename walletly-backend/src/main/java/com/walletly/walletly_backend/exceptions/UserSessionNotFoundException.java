package com.walletly.walletly_backend.exceptions;

public class UserSessionNotFoundException extends Exception {
	public UserSessionNotFoundException() {
		super("Your email is not in memory");
	}
}
