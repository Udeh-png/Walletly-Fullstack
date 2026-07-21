package com.walletly.walletly_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
	@Autowired
	JavaMailSender mailSender;
	
	public void sendEmail (String to, String text) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setText(text);
		message.setSubject("OTP Verification");
		message.setFrom("Walletly <udehschisom001@gmail.com>");
		
		mailSender.send(message);
	}
}
