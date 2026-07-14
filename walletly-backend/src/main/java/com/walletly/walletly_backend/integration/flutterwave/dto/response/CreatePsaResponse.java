package com.walletly.walletly_backend.integration.flutterwave.dto.response;

import lombok.Data;
import lombok.Getter;

import java.time.Instant;

@Data
@Getter
public class CreatePsaResponse {
	private String status;
	private PayoutSubaccountData data;
}
