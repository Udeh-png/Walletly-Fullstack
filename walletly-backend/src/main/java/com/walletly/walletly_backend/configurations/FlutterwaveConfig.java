package com.walletly.walletly_backend.configurations;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class FlutterwaveConfig {
	@Value("${flutter.client.secret}")
	private String clientSecret;
	
	@Bean
	@Qualifier("flutterwaveRestClient")
	public RestClient flutterRestClient () {
		return RestClient.builder()
				.baseUrl("https://api.flutterwave.com/v3")
				.defaultHeader("Authorization", "Bearer " + clientSecret)
				.build();
	}
}
