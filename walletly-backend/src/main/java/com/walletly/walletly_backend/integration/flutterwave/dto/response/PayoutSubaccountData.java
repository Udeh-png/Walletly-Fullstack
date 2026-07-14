package com.walletly.walletly_backend.integration.flutterwave.dto.response;

import lombok.Data;
import lombok.Getter;

import java.time.Instant;

@Data
public class PayoutSubaccountData {
	@Getter
	private int id;
	@Getter
	private String account_reference;
	@Getter
	private String account_name;
	@Getter
	private String barter_id;
	@Getter
	private String email;
	@Getter
	private String mobile_number;
	@Getter
	private String country;
	@Getter
	private String nuban;
	@Getter
	private String bank_name;
	@Getter
	private String status;
	@Getter
	private Instant created_at;
}
