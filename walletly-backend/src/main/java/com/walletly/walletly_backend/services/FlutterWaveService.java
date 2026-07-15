package com.walletly.walletly_backend.services;

import com.walletly.walletly_backend.dtos.requests.RegistrationRequest;
import com.walletly.walletly_backend.integration.flutterwave.dto.requests.CreatePsaRequest;
import com.walletly.walletly_backend.integration.flutterwave.dto.requests.TransferRequest;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.CreatePsaResponse;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.FundWalletResponse;
import com.walletly.walletly_backend.mappers.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class FlutterWaveService {
	@Autowired
	RestClient restClient;
	
	public CreatePsaResponse createPayoutSubaccount (RegistrationRequest regReq) {
		CreatePsaRequest createPsaRequest = Mapper.registrationRequestToCreatePsaRequest(regReq);
		return restClient.post()
				.uri("/payout-subaccounts")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				.body(createPsaRequest)
				.retrieve()
				.body(CreatePsaResponse.class);
	}
	
	public FundWalletResponse fundWallet (TransferRequest transferRequest) {
		/*
		* account_bank
		* account_number
		* amount
		* currency
		* debit_currency
		*/
	}
}
