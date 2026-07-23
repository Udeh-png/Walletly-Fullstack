package com.walletly.walletly_backend.modals;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

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
	private String type;
	
	@NonNull
	@Setter
	private String direction;
	
	@NonNull
	@Setter
	private BigDecimal settled_amount;
	
	@NonNull
	@Setter
	private String status;
	
	@NonNull
	@Setter
	private String reference;
	
	@NonNull
	@Setter
	private String description;
	
	@NonNull
	@Setter
	private Instant createdAt;
	
	private Map<String, Object> metaData;
	
}
