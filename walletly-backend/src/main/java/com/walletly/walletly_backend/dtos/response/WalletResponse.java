package com.walletly.walletly_backend.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WalletResponse {
	String id;
	String accountName;
	String accountNumber;
	String emailAddress;
	String mobileNumber;
}
