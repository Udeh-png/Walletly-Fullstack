package com.walletly.walletly_backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
	private String id;
	
	@NotBlank
	@Size(min=3, max = 20)
	private String firstname;
	
	@NotBlank
	@Size(min=3, max = 20)
	private String lastname;
	
	@NotBlank
	@Email
	private String email;
	
	@NotBlank
	@Size(min=8)
	@Pattern(regexp = "^(?=.[A-Z])(?=.[a-z])(?=.[0-9])(?=.[^A-Za-z0-9]).+$")
	private String password;
	private final Long timestamp = System.currentTimeMillis();
}
