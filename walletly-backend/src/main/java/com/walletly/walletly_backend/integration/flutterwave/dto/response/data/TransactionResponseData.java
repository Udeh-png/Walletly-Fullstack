package com.walletly.walletly_backend.integration.flutterwave.dto.response.data;

import com.walletly.walletly_backend.integration.flutterwave.dto.response.data.common.CardResponse;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.data.common.Meta;
import lombok.*;

@EqualsAndHashCode
@ToString
@Getter
public class TransactionResponseData {
	private int id;
	private String tx_ref;
	private String flw_ref;
	private String amount;
	private String currency;
	private String narration;
	private String status;
	private double charge_amount;
	private double app_fee;
	private double merchant_fee;
	private CardResponse card;
	private Meta meta;
	private double amount_settled;
}
