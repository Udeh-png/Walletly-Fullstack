package com.walletly.walletly_backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OtpResponse {
	String tempUserId;
	Long otpGenerationTimestamp;
}
