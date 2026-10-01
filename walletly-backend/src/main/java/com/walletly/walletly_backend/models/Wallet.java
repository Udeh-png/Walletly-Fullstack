package com.walletly.walletly_backend.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.Instant;

@Document("Wallets")
@RequiredArgsConstructor
@NoArgsConstructor
@Getter
public class Wallet {
	@Id
	private String id;
	
	@Setter
	@NonNull
	@Indexed(unique = true)
	private String userId;
	
	@Setter
	@NonNull
	private String accountName;
	
	@Setter
	@NonNull
	private BigDecimal balance;
	
	@Setter
	@NonNull
	private String virtualAccountNumber;
	
	@Setter
	@NonNull
	private String emailAddress;
	
	@Setter
	@NonNull
	private String virtualAccountBank;
	
	@Setter
	@NonNull
	private String barterId;
	
	@Setter
	@NonNull
	private String accountReference;
	
	@Setter
	@NonNull
	private String flutterwavePsaId;
	
	@Setter
	@NonNull
	private String email;
	
	@Setter
	private String mobileNumber;
	
	@Setter
	@NonNull
	private String country;
	
	@Setter
	@NonNull
	private String status;
	
	@Setter
	@NonNull
	private Instant createdAt;
}
