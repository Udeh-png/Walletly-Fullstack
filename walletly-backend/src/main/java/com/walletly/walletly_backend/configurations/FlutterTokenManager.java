package com.walletly.walletly_backend.configurations;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.Instant;
import java.util.Map;

@Component
public class FlutterTokenManager {
	String token;
	Instant expiryTime;
	
	public String getValidToken () {
		if (token == null || Instant.now().isAfter(expiryTime.minusSeconds(60)))
			fetchFlutterAccessToken();
		
		return token;
	}
	
	public void fetchFlutterAccessToken () {
		RestClient restClient = RestClient.create();
		
		var response = restClient.post()
				.uri("")
				.body("client_id=" + "clientId" + "&client_secret=" + "clientSecret" + "&grant_type=client_credentials")
				.contentType(MediaType.APPLICATION_FORM_URLENCODED)
				.retrieve()
				.body(Map.class);
		
		
		assert response != null;
		token = (String)response.get("access_token");
		int expiresIn = (int) response.get("expires_in");
		expiryTime = Instant.now().plusSeconds(expiresIn);
	}
}
