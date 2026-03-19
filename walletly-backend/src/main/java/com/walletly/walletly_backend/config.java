package com.walletly.walletly_backend;

import com.resend.Resend;
import com.walletly.walletly_backend.utils.SuspendedAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.net.http.HttpRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
public class config {
	ConcurrentHashMap<String, SuspendedAccount> suspendedAccountMap = new ConcurrentHashMap<>();
	
	@Autowired
	private Environment env;
	
	@Bean
	public SecurityFilterChain filterChain (HttpSecurity security) throws Exception {
		security.authorizeHttpRequests(
				(auth) -> auth
						.requestMatchers("/auth/**").permitAll()
						.anyRequest()
						.authenticated())
						.csrf(CsrfConfigurer::disable);
		
		return security.build();
	}
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder () {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public Resend resend () {
		return new Resend(env.getProperty("resend.api.key"));
	}
	
	@Bean
	public ConcurrentHashMap<String, SuspendedAccount> suspendedAccount () {
		return suspendedAccountMap;
	}
}
