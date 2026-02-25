package com.walletly.walletly_backend.modals;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("Users")
public class User {
	@Id
	private String id;
	private String password;
	private String email;
	private String firstName;
	private String lastName;
	
}
