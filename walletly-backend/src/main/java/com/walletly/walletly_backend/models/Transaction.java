package com.walletly.walletly_backend.modals;

import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;

@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Document("Transactions")
public class Transaction {
	private String id;
	
	@NonNull
	@Setter
	@Indexed(unique = true)
	@Field(name = "card_tx_ref")
	private String cardTxRef;
	
	@NonNull
	@Setter
	@Field(name = "to_wallet_tx_ref")
	String toWalletTxRef;
	
	@NonNull
	@Setter
	private String type;
	
	@NonNull
	@Setter
	private String direction;
	
	@NonNull
	@Setter
	@Field(name = "settled_amount")
	private BigDecimal settledAmount;
	
	@NonNull
	@Setter
	private String status;
	
	
	@NonNull
	@Setter
	private String description;
	
	@NonNull
	@Setter
	private Instant createdAt;
	
	@Setter
	private Map<String, Object> metaData;
	
}
