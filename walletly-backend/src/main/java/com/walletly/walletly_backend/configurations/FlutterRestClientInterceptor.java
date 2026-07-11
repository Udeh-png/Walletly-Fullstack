package com.walletly.walletly_backend.configurations;

import org.jspecify.annotations.NullMarked;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;

import java.io.IOException;

public class FlutterRestClientInterceptor implements ClientHttpRequestInterceptor {
	@Autowired
	FlutterTokenManager flutterTokenManager;
	
	@NullMarked
	@Override
	public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
		request.getHeaders().setBearerAuth(flutterTokenManager.getValidToken());
		return execution.execute(request, body);
	}
}
