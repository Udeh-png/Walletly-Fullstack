package com.walletly.walletly_backend.dtos;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
public class ErrorResponse {
	private String message;
	private String type;
}
