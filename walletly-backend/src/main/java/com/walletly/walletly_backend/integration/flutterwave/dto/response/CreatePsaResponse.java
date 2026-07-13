package com.walletly.walletly_backend.integration.flutterwave.dto.response;

import lombok.Data;
import lombok.Getter;

import java.time.Instant;

@Data
@Getter
public class CreatePsaResponse {
	private String status;
	private PsaData data;
}

@Data
@Getter
class PsaData {
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