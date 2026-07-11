package com.walletly.walletly_backend.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class FlutterwaveConfig {
	public RestClient restClient () {
		return RestClient.builder()
				.baseUrl("")
				.requestInterceptor(new FlutterRestClientInterceptor())
				.build();
	}
}
