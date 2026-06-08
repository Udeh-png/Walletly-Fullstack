package com.walletly.walletly_backend.modals;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document("Wallets")
@RequiredArgsConstructor
@Getter
public class Wallet {
	@Id
	private String id;
	
	@Setter
	@NonNull
	private String userId;
	
	@Setter
	@NonNull
	private double balance;
	
	@Setter
	@NonNull
	private LocalDateTime createdAt;
	
	@Setter
	@NonNull
	private String currency;
}
