package com.walletly.walletly_backend.integration.flutterwave.dto.response.data;

import lombok.*;

import java.time.Instant;

@EqualsAndHashCode
@ToString
@Getter
public class CreatePsaResponseData {
	private int id;
	private String account_reference;
	private String account_name;
	private String barter_id;
	private String email;
	private String mobile_number;
	private String country;
	private String nuban;
	private String bank_name;
	private String status;
	private Instant created_at;
}
