package com.walletly.walletly_backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class ValidateUserRequest {
	
	@NotBlank
	@Email
	private String email;
	
	@NotBlank
	@Length(min = 6, max = 6)
	private String otp;
}
