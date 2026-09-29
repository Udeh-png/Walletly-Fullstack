package com.walletly.walletly_backend.integration.flutterwave.dto.requests;

import lombok.*;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlutterwaveTransferRequest {
	private String account_bank;
	private String account_number;
	private BigDecimal amount;
	private String currency;
	private String debit_currency;
	private String debit_subaccount;
	private String reference;
	private String narration;
}
