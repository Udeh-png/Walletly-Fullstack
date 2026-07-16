package com.walletly.walletly_backend.integration.flutterwave.dto.response.data.common;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CardResponse {
	private String first_6digits;
	private String last_4digits;
	private String issuer;
	private String country;
	private String type;
	private String token;
	private String expiry;
}
