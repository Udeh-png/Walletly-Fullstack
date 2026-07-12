package com.walletly.walletly_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class FlutterWaveService {
	@Autowired
	RestClient restClient;
	
	public void createPayoutSubaccount () {
		restClient.post();
	}
}
