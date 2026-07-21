package com.walletly.walletly_backend.integration.flutterwave.dto.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class CreatePsaRequest {
	@NonNull
	private String account_name;
	
	@NonNull
	private String email;
	
	@NonNull
	private String country;
	
	@NonNull
	private String bank_code;
	
}
