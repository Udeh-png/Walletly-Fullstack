package com.walletly.walletly_backend.integration.flutterwave.dto.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class CreatePsaRequest {
	@NonNull
	@JsonProperty("account_name")
	private String accountName;
	
	@NonNull
	private String email;
	
	@NonNull
	private String country;
	
	@NonNull
	@JsonProperty("bank_code")
	private String bankCode;
	
	@NonNull
	private String mobilenumber;
	
}
