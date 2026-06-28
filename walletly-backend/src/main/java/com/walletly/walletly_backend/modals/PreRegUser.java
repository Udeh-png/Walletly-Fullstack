package com.walletly.walletly_backend.modals;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@RequiredArgsConstructor
@Document(collection = "preregistered_users")
public class PreRegUser {
	@Id
	private String id;
	
	@NonNull
	private String email;
	
	@NonNull
	private String password;
	
	@NonNull
	private String firstName;
	
	@NonNull
	private String lastName;
	
	@NonNull
	@Indexed(expireAfter = "30s")
	private Instant createdAt;
}
