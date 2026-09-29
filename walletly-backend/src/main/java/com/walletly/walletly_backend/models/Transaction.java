package com.walletly.walletly_backend.models;

import com.walletly.walletly_backend.emuns.TransactionDirection;
import com.walletly.walletly_backend.emuns.TransactionStatus;
import com.walletly.walletly_backend.emuns.TransactionType;
import com.walletly.walletly_backend.utils.CardInfo;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.time.Instant;

@NoArgsConstructor
@RequiredArgsConstructor
@Data
@Document("Transactions")

public class Transaction {
	@Id
	private String id;
	@Indexed(unique = true)
	private String reference;
	
	@NonNull
	private TransactionType type;
	@NonNull
	private TransactionDirection direction;
	
	@NonNull
	private BigDecimal settledAmount;
	
	@NonNull
	private TransactionStatus status;
	@NonNull
	private String description;
	
	@NonNull
	private Instant createdAt;
	@NonNull
	private Instant updatedAt;
	
	private P2PDetails p2PDetails;
	private DepositDetails depositDetails;
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public static class P2PDetails {
		private String senderWalletId;
		private String senderAccountName;
		private String senderAccountNumber;
		
		private String receiverWalletId;
		private String receiverAccountName;
		private String receiverAccountNumber;
		
		private BigDecimal fee;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public static class DepositDetails {
		@Field(name = "to_wallet_tx_ref")
		private String toWalletTxRef;
		
		private CardInfo cardInfo;
	}
}

