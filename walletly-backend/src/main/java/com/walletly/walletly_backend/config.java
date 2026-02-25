package com.walletly.walletly_backend;

import com.resend.Resend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class config {
	@Autowired
	private Environment env;
	
	@Bean
	public Resend resend () {
		return new Resend(env.getProperty("resend.api.key"));
	}
}
