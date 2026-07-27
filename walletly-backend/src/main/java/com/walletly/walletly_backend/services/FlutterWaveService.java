package com.walletly.walletly_backend.services;

import com.walletly.walletly_backend.dtos.requests.RegistrationRequest;
import com.walletly.walletly_backend.integration.flutterwave.dto.requests.CreatePsaRequest;
import com.walletly.walletly_backend.integration.flutterwave.dto.requests.FlutterwaveTransferRequest;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.CreatePsaResponse;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.VerifyTransactionResponse;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.TransferResponse;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.VerifyTransferResponse;
import com.walletly.walletly_backend.mappers.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class FlutterWaveService {
	@Autowired
	@Qualifier("flutterwaveRestClient")
	RestClient restClient;
	
	MediaType jsonType = MediaType.APPLICATION_JSON;
	public CreatePsaResponse createPayoutSubaccount (RegistrationRequest regReq) {
		CreatePsaRequest createPsaRequest = Mapper.registrationRequestToCreatePsaRequest(regReq);
		System.out.println(createPsaRequest);
		return restClient.post()
				.uri("/payout-subaccounts")
				.contentType(jsonType)
				.accept(jsonType)
				.body(createPsaRequest)
				.retrieve()
				.body(CreatePsaResponse.class);
	}
	
	public VerifyTransferResponse verifyTransfer (String transferId) {
		return restClient.get()
				.uri("/transfers/" + transferId)
				.accept(jsonType)
				.retrieve()
				.body(VerifyTransferResponse.class);
	}
	
	public VerifyTransactionResponse verifyTransaction (String transactionId) {
		return restClient.get()
				.uri("/transactions/" + transactionId + "/verify")
				.accept(jsonType)
				.retrieve()
				.body(VerifyTransactionResponse.class);
	}
	
	public TransferResponse sendMoney (FlutterwaveTransferRequest flutterwaveTransferRequest) {
		return restClient.post()
				.uri("/transfers")
				.contentType(jsonType)
				.accept(jsonType)
				.body(flutterwaveTransferRequest)
				.retrieve()
				.body(TransferResponse.class);
	}
	
	public Object getBillers (String category) {
		return restClient.get()
				.uri("/bills/" + category + "/billers")
				.accept(jsonType)
				.retrieve()
				.body(Object.class);
	}
	
	public Object getBillerInfo (String billerCode) {
		return restClient.get()
				.uri("/bills/" + billerCode + "/items")
				.accept(jsonType)
				.retrieve()
				.body(Object.class);
	}
	
	public Object getUserBillingInfo (String itemCode, String userBillId) {
		return restClient.get()
				.uri("/bill-items/" + itemCode + "/validate?customer=" + userBillId)
				.accept(jsonType)
				.retrieve()
				.body(Object.class);
	}
	
	public Object payBill () {
		return restClient.post()
				.uri("/billers/{biller-code}/items/{item-code}/payment")
				.contentType(jsonType)
				.accept(jsonType)
				.body(null)
				.retrieve()
				.body(Object.class);
	}
	
	public Object confirmBillPayment (String reference) {
		return restClient.post()
				.uri("https://api.flutterwave.com/v3/bills/" + reference)
				.contentType(jsonType)
				.accept(jsonType)
				.body(null)
				.retrieve()
				.body(Object.class);
	}
}
