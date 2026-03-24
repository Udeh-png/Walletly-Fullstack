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
	
	public List<OtpSession> getSessions (String email) {
		return otpSessionsMap.get(email);
	}
	
	public OtpSession generateOtp () {
		int otpInt = secureRandom.nextInt(900000) + 100000; //generate the otp
		
		OtpSession otpSession = new OtpSession(); // create a new otp session object
		otpSession.setOtp(String.valueOf(otpInt));
		return otpSession;
	}
	
	public void send (String email, OtpSession otpSession)throws ResendException {
		String message =
				"<p>Your OTP is: <strong style='font-size: 15px; color: #2563eb;'>"
						+ otpSession.getOtp() +
						"</strong> Do not share this code with anyone</p>"; // html message
		
		CreateEmailOptions emailOptions = CreateEmailOptions.builder()
				.from("onboarding@resend.dev")
				.to(email)
				.subject("Email Verification")
				.html(message)
				.build(); // build the message to send with resend api
		resend.emails().send(emailOptions);
		otpSession.setGenerateTimestamp(System.currentTimeMillis());
		otpSessionsMap.computeIfAbsent(email, (k) -> new ArrayList<>()).add(otpSession);
	}
	
	public boolean hasOtpSession (String email) {
		return otpSessionsMap.containsKey(email);
	}
	
	public boolean hasReachedLimit (String email) throws UserSessionNotFoundException {
		List<OtpSession> sessions = otpSessionsMap.get(email);
		
		if (sessions == null || sessions.isEmpty()) throw new UserSessionNotFoundException();
		
		OtpSession lastSession = sessions.getLast();
		return sessions.size() >= 3 && lastSession.hasExpired();
	}
	
	public boolean otpIsValid (String email, String otp) throws UserSessionNotFoundException {
		List<OtpSession> sessions = otpSessionsMap.get(email);
		
		if (sessions == null || sessions.isEmpty()) throw new UserSessionNotFoundException();
		
		OtpSession currentSession = sessions.getLast();
		
		return currentSession.getOtp().equals(otp);
	}
}