package com.walletly.walletly_backend.integration.flutterwave.dto.requests;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlutterwaveTransferRequest {
	private String account_bank;
	private String account_number;
	private double amount;
	private String currency;
	private String debit_currency;
	private String debit_subaccount;
	private String reference;
	private String narration;
}
