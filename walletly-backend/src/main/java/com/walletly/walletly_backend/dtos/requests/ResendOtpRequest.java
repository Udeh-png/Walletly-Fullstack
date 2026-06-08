package com.walletly.walletly_backend.dtos.requests;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class ResendOtpRequest {
	
	@Email
	private String email;
}
