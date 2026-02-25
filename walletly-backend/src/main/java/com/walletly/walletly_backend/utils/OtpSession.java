package com.walletly.walletly_backend.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OtpSession {
	private String sessionId;
	private String otp;
	private Long generateTimestamp;
}
