package com.walletly.walletly_backend.exceptions;

public class NotAuthorized extends RuntimeException {
	public NotAuthorized(String message) {
		super(message);
	}
	public NotAuthorized() {
		super();
	}
}
