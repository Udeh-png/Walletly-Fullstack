package com.walletly.walletly_backend.integration.flutterwave.dto.response.data;

import lombok.*;

import java.time.Instant;

@EqualsAndHashCode
@ToString
@Getter
public class TransferResponseData {
	private String id;
	private String account_name;
	private String bank_code;
	private String full_name;
	private String currency;
	private String debit_currency;
	private String amount;
	private String fee;
	private String status;
	private String reference;
	private String narration;
	private boolean requires_approval;
	private boolean is_approved;
	private String bank_name;
	private Instant createdAt;
}
