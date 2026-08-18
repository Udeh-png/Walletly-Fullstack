package com.walletly.walletly_backend.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public class MailService {
	@Autowired
	JavaMailSender mailSender;
	
	public void sendEmail (String to, String text) throws MessagingException, UnsupportedEncodingException {
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
		helper.setTo(to);
		helper.setText(text);
		helper.setSubject("OTP Verification " + System.currentTimeMillis());
		helper.setFrom(new InternetAddress("udehschisom001@gmail.com", "Walletly"));
		
		mailSender.send(message);
	}
}
