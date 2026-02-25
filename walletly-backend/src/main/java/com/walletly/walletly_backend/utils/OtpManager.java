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
	
	public OtpSession generate (String sessionId, String email) {
		int otpInt = secureRandom.nextInt(900000) + 100000;
		OtpSession otpSession = new OtpSession(sessionId, String.valueOf(otpInt), System.currentTimeMillis());
		String message =
				"<p>Your OTP is: <strong style='font-size: 15px; color: #2563eb;'>"
						+ otpSession.getOtp() +
						"</strong> Do not share this code with anyone</p>";
		
		CreateEmailOptions emailOptions = CreateEmailOptions.builder()
				.from("onboarding@resend.dev")
						.to(email)
								.subject("Email Verification")
										.html(message)
												.build();
		
		try {
			CreateEmailResponse emailResponse = resend.emails().send(emailOptions);
			System.out.println(emailResponse.getId());
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
	
	public OtpSession generateAndValidate(String email, String sessionId) {
		final int OTP_EXPIRATION_TIME = 30000;
		final Long SUSPENSION_TIME = 60000L;
		
		if (suspendedEmails.containsKey(email)) {
			SuspendedAccount account = suspendedEmails.get(email);
			throw new AccountSuspendedException(account.getReason());
		}
		
		boolean hasPendingSessions = otpSessionsMap.containsKey(email) && !otpSessionsMap.get(email).isEmpty();
		
		if (hasPendingSessions) {
			List<OtpSession> otpSessions = otpSessionsMap.get(email);
			
			if (otpSessions.size() >= 3 &&
					System.currentTimeMillis() - otpSessions.getLast().getGenerateTimestamp() > OTP_EXPIRATION_TIME) {
				System.out.println("Email suspended for too many requests");
				SuspendedAccount suspendedAccount = new SuspendedAccount(
						email,
						System.currentTimeMillis(),
						SUSPENSION_TIME,
						"Too many OTP requests"
				);
				suspendedEmails.put(email, suspendedAccount);
				String timeLeft = suspendedAccount.getTimeLeft() / 60000 + "Mins";
				otpSessions.clear();
				throw new TooManyOtpRequestsException(timeLeft);
			}
			
			OtpSession lastSession = otpSessions.getLast();
			boolean hasExpired = System.currentTimeMillis() - lastSession.getGenerateTimestamp() >= OTP_EXPIRATION_TIME;
			
			if (!hasExpired) {
				return lastSession;
			} else {
				return generate(lastSession.getSessionId(), email);
			}
		}
		
		return generate(sessionId, email);
	}
}
