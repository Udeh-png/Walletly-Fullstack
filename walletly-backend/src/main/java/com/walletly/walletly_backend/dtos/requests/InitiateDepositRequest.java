package com.walletly.walletly_backend.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InitiateDepositRequest {
	double amount;
	String barter_id;
	boolean remember_me;
	String tx_ref;
	String user_id;
}
