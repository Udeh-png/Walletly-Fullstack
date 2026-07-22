package com.walletly.walletly_backend.modals;

import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;

@Document("Transactions")
public class Transaction {
//	private String id;
//	private TransactionType type;
//	private TransactionDirection direction;
//	private BigDecimal settled_amount;
//	private TransactionStatus status;
//	private String reference;
//	private String description;
//	private Instant createdAt;
	
	private Map<String, Object> metaData;
	
}
