package com.walletly.walletly_backend.integration.flutterwave.dto.response;

import com.walletly.walletly_backend.integration.flutterwave.dto.response.data.TransferResponseData;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@ToString
@Getter
public class TransferResponse extends FlutterwaveResponse{
	private TransferResponseData data;
}
