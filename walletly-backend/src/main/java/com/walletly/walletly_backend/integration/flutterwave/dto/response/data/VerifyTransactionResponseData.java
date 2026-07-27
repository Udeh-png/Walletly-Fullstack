package com.walletly.walletly_backend.integration.flutterwave.dto.response.data;

import lombok.*;

@EqualsAndHashCode
@ToString
@Getter
public class VerifyTransactionResponseData {
	private int data;
	
	private String account_number;
	
	private String bank_code;
	
	private String full_name;
	
	private String currency;
	
	private String debit_currency;
	
	private double amount;
	
	private double fee;
	
	private String status;
	
	private String reference;
	
	private String narration;
	
	private String bank_name;
}
