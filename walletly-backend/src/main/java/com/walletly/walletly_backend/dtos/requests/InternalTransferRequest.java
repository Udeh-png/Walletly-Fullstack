package com.walletly.walletly_backend.dtos.requests;

import com.walletly.walletly_backend.emuns.TransferIdentifierType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InternalTransferRequest {
	private TransferIdentifierType identifierType;
	private String identifier;
	private BigDecimal amount;
	private String narration;
}
