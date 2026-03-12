package com.walletly.walletly_backend.utils;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ErrorResponse {
	private String message;
	private String type;
}
