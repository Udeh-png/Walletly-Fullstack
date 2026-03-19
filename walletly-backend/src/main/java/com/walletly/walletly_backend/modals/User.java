package com.walletly.walletly_backend.modals;

import com.mongodb.lang.Nullable;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;


@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Document("Users")
public class User {
	@Id
	private ObjectId id;
	
	@NonNull
	@Setter
	private String firstName;
	
	@NonNull
	@Setter
	private String lastName;
	
	@NonNull
	@Setter
	private String email;
	
	@NonNull
	@Setter
	private String password;
	
	@Nullable
	@Setter
	private String phone;
	
	@Nullable
	@Setter
	private String flutterwaveCustomerId;
	
	@NonNull
	@Setter
	private ArrayList<PaymentMethod> paymentMethods;
	
	@NonNull
	@Setter
	private LocalDateTime createdAt;
}
