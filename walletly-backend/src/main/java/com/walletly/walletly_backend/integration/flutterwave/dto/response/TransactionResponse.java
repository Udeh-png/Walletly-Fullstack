package com.walletly.walletly_backend.integration.flutterwave.dto.response;

import com.walletly.walletly_backend.integration.flutterwave.dto.response.data.TransactionResponseData;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class TransactionResponse extends FlutterwaveResponse {
	private TransactionResponseData data;
}
