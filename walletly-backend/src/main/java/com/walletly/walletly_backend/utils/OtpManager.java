package com.walletly.walletly_backend.utils;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.*;
import com.walletly.walletly_backend.exceptions.AccountSuspendedException;
import com.walletly.walletly_backend.exceptions.TooManyOtpRequestsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.net.SocketTimeoutException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class OtpManager {
	private final ConcurrentHashMap<String, List<OtpSession>> otpSessionsMap = new ConcurrentHashMap<>();
	SecureRandom secureRandom = new SecureRandom();
	
	@Autowired
	private Resend resend;
	
	final int OTP_EXPIRATION_TIME = 5 * 60000;
	
	public void removeEmailFromMap (String email) {
		otpSessionsMap.remove(email);
	}
	
	public OtpSession generate (String tempUserId, String email) {
		int otpInt = secureRandom.nextInt(900000) + 100000; //generate the otp
		OtpSession otpSession;
		String message =
				"<p>Your OTP is: <strong style='font-size: 15px; color: #2563eb;'>"
						+ otpInt +
						"</strong> Do not share this code with anyone</p>"; // html message
		
		CreateEmailOptions emailOptions = CreateEmailOptions.builder()
				.from("onboarding@resend.dev")
						.to(email)
								.subject("Email Verification")
										.html(message)
												.build(); // build the message to send with resend api
		try {
			resend.emails().send(emailOptions);
			otpSession = new OtpSession(tempUserId, String.valueOf(otpInt), System.currentTimeMillis()); // create a new otp session object
		} catch (ResendException e) {
			throw new RuntimeException(e);
		}
		
		otpSessionsMap.computeIfAbsent(email, (k) -> new ArrayList<>()).add(otpSession);
		
		return otpSession;
	}
	
	public OtpSession validateAndGenerate(String email, String tempUserId)throws TooManyOtpRequestsException {
		boolean hasPendingSessions = otpSessionsMap.containsKey(email);
		
		if (hasPendingSessions) {
			List<OtpSession> otpSessions = otpSessionsMap.get(email);
			
			OtpSession lastSession = otpSessions.getLast();
		  boolean hasExpired = System.currentTimeMillis() - lastSession.getGenerateTimestamp() >= OTP_EXPIRATION_TIME;
			
			if (otpSessions.size() >= 3 && hasExpired) { // check if user has made up to 3 otp requests and the last request has expires
				throw new TooManyOtpRequestsException(""); // throw an error for too many requests
			}
			
			if (!hasExpired) {
				return lastSession; // if the otp has not expired DO NOT generate a new otp session just resend the las session to the frontend
			}
		}
		
		return generate(tempUserId, email);
	}
	
	public void verifyOtp (String email, String otp) {
		OtpSession otpSession = otpSessionsMap.get(email).getLast();
		if (!otp.equals(otpSession.getOtp())) {
			throw new RuntimeException();
		}
		
	}
}
