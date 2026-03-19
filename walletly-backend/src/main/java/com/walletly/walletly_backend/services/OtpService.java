package com.walletly.walletly_backend.services;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.*;
import com.walletly.walletly_backend.exceptions.*;
import com.walletly.walletly_backend.utils.OtpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class OtpService {
	private final ConcurrentHashMap<String, List<OtpSession>> otpSessionsMap = new ConcurrentHashMap<>();
	SecureRandom secureRandom = new SecureRandom();
	
	@Autowired
	private Resend resend;
	
	public void removeEmailFromMap (String email) {
		otpSessionsMap.remove(email);
	}
	
	public OtpSession generate (String tempUserId, String email) throws ResendException {
		int otpInt = secureRandom.nextInt(900000) + 100000; //generate the otp
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
		resend.emails().send(emailOptions);
		OtpSession otpSession = new OtpSession(tempUserId, String.valueOf(otpInt), System.currentTimeMillis()); // create a new otp session object
		
		otpSessionsMap.computeIfAbsent(email, (k) -> new ArrayList<>()).add(otpSession);
		
		return otpSession;
	}
	
	public OtpSession validateAndGenerate(String email, String tempUserId)throws ResendException,TooManyOtpRequestsException {
		boolean hasPendingSessions = otpSessionsMap.containsKey(email);
		
		if (hasPendingSessions) {
			List<OtpSession> otpSessions = otpSessionsMap.get(email);
			
			OtpSession lastSession = otpSessions.getLast();
			
			if (otpSessions.size() >= 3 && lastSession.hasExpired()) { // check if user has made up to 3 otp requests and the last request has expires
				throw new TooManyOtpRequestsException(); // throw an error for too many requests
			}
			
			if (!lastSession.hasExpired()) {
				return lastSession; // if the otp has not expired DO NOT generate a new otp session just resend the las session to the frontend
			}
		}
		
		return generate(tempUserId, email);
	}
	
	public void verifyOtp (String email, String otp) {
		List<OtpSession> sessions = otpSessionsMap.get(email);
		
		if (sessions == null || sessions.isEmpty()) throw new UserSessionNotFoundException();
		
		OtpSession currentSession = sessions.getLast();
		
		if (currentSession.hasExceededAttemptLimit()) {
			throw new TooManyOtpAttemptsException();
		}
		
		if (currentSession.hasExpired()) throw new OtpHasExpiredException();
		
		if (!currentSession.getOtp().equals(otp)) {
			currentSession.incrementAttempts();
			throw new OtpMissMatchException();
		}
	}
}