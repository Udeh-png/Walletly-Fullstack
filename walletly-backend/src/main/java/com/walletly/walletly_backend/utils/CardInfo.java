package com.walletly.walletly_backend.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardInfo {
	private String first_6digits;
	private String last_4digits;
	private String issuer;
	private String country;
	private String type;
	private String token;
	private String expiry;
}
