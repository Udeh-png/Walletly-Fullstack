package com.walletly.walletly_backend.integration.flutterwave.dto.response;

import com.walletly.walletly_backend.integration.flutterwave.dto.response.data.CreatePsaResponseData;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@EqualsAndHashCode(callSuper = true)
@ToString
@Getter
public class CreatePsaResponse extends FlutterwaveResponse{
	private CreatePsaResponseData data;
}
