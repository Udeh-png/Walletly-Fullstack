package com.walletly.walletly_backend.integration.flutterwave.dto.response;

import com.walletly.walletly_backend.integration.flutterwave.dto.response.data.VerifyTransactionResponseData;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@EqualsAndHashCode(callSuper = true)
@ToString
public class VerifyTransferResponse extends FlutterwaveResponse{
	VerifyTransactionResponseData data;
}
