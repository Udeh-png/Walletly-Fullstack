package com.walletly.walletly_backend.exceptions;

public class NotAuthorizedException extends RuntimeException {
	
	public NotAuthorizedException (String message) {
		super(message);
	}
}
