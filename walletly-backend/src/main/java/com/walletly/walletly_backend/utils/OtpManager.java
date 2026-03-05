package com.walletly.walletly_backend.utils;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.*;
import com.walletly.walletly_backend.exceptions.AccountSuspendedException;
import com.walletly.walletly_backend.exceptions.TooManyOtpRequestsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class OtpManager {
	private final ConcurrentHashMap<String, List<OtpSession>> otpSessionsMap = new ConcurrentHashMap<>();
	private final ConcurrentHashMap<String, SuspendedAccount> suspendedEmails = new ConcurrentHashMap<>();
	SecureRandom secureRandom = new SecureRandom();
	
	@Autowired
	private Resend resend;
	
	final int OTP_EXPIRATION_TIME = 5 * 60000;
	final Long SUSPENSION_TIME = 60000L;
	
	public OtpSession generate (String sessionId, String email) {
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
			otpSession = new OtpSession(sessionId, String.valueOf(otpInt), System.currentTimeMillis()); // create a new otp session object
		} catch (ResendException e) {
			throw new RuntimeException(e);
		}
		
		otpSessionsMap.computeIfAbsent(email, (k) -> new ArrayList<>()).add(otpSession);
		
		return otpSession;
	}
	
	public SuspendedAccount getSuspendedAccount (String email) {
		return suspendedEmails.get(email);
	}
	
	public void removeSuspension (String email) {
		suspendedEmails.remove(email);
	}
	
	public OtpSession validateAndGenerate(String email, String sessionId) {
		if (suspendedEmails.containsKey(email)) { // check if the email has been suspended b4 validating
			SuspendedAccount account = suspendedEmails.get(email);
			throw new AccountSuspendedException(account.getReason()); // throw an error if it has
		}
		
		boolean hasPendingSessions = otpSessionsMap.containsKey(email);
		
		if (hasPendingSessions) {
			List<OtpSession> otpSessions = otpSessionsMap.get(email);
			
			OtpSession lastSession = otpSessions.getLast();
		  boolean hasExpired = System.currentTimeMillis() - lastSession.getGenerateTimestamp() >= OTP_EXPIRATION_TIME;
			
			if (otpSessions.size() >= 3 && hasExpired) { // check if user has made up to 3 otp requests and the last request has expires
				SuspendedAccount suspendedAccount = new SuspendedAccount(
						email,
						System.currentTimeMillis(),
						SUSPENSION_TIME,
						"Too many OTP requests"
				);
				suspendedEmails.put(email, suspendedAccount); // add the user to the suspended email map
				String timeLeft = suspendedAccount.getTimeLeft() / 60000 + "Mins";
				otpSessions.clear();
				throw new TooManyOtpRequestsException(timeLeft); // throw an error for too many requests
			}
			if (!hasExpired) {
				return lastSession; // if the otp has not expired DO NOT generate a new otp session just resend the las session to the frontend
			}
			
			return generate(lastSession.getSessionId(), email); //if the otp has expired generate a new otp session and send it
		}
		
		return generate(sessionId, email);
	}
}
