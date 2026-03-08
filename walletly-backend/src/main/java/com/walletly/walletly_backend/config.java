package com.walletly.walletly_backend;

import com.resend.Resend;
import com.walletly.walletly_backend.utils.SuspendedAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
public class config {
	ConcurrentHashMap<String, SuspendedAccount> suspendedAccountMap = new ConcurrentHashMap<>();
	
	@Autowired
	private Environment env;
	
	@Bean
	public Resend resend () {
		return new Resend(env.getProperty("resend.api.key"));
	}
	
	@Bean
	public ConcurrentHashMap<String, SuspendedAccount> suspendedAccount () {
		return suspendedAccountMap;
	}
}
