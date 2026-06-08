package com.walletly.walletly_backend.dtos.response;

import com.mongodb.lang.Nullable;
import com.walletly.walletly_backend.modals.PaymentMethod;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
	@Id
	private String id;
	
	@NotBlank
	@Size(min=3, max = 20)
	@NonNull
	@Setter
	private String firstName;
	
	@NotBlank
	@Size(min=3, max = 20)
	@NonNull
	@Setter
	private String lastName;
	
	@NotBlank
	@Email
	@NonNull
	@Setter
	private String email;
	
	@Setter
	private LocalDateTime createdAt;
}
