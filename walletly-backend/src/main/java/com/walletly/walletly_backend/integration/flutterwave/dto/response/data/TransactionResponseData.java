package com.walletly.walletly_backend.integration.flutterwave.dto.response.data;

import com.walletly.walletly_backend.integration.flutterwave.dto.response.data.common.Meta;
import com.walletly.walletly_backend.utils.CardInfo;
import lombok.*;

import java.math.BigDecimal;

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
	private BigDecimal charge_amount;
	private BigDecimal app_fee;
	private BigDecimal merchant_fee;
	private CardInfo card;
	private Meta meta;
	private BigDecimal amount_settled;
}
