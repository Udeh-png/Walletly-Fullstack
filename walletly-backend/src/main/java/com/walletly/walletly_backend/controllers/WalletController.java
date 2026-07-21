package com.walletly.walletly_backend.controllers;

import com.walletly.walletly_backend.integration.flutterwave.dto.requests.FlutterwaveTransferRequest;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.TransactionResponse;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.TransferResponse;
import com.walletly.walletly_backend.services.FlutterWaveService;
import com.walletly.walletly_backend.services.WalletService;
import com.walletly.walletly_backend.utils.CookieType;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Objects;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {
	@Autowired
	FlutterWaveService flutterWaveService;
	@Autowired
	WalletService walletService;
	
	@PostMapping("/deposit/initiate")
	public ResponseEntity<?> initiateFunding (@RequestBody HashMap<String, BigDecimal> json, HttpServletRequest request) {
		String accessToken = Objects.requireNonNull(WebUtils.getCookie(request, CookieType.ACCESS_TOKEN.getName())).getValue();
		
		String tx_ref = walletService.initiateDeposit(accessToken, json.get("amount").doubleValue());
		
		return new ResponseEntity<>(tx_ref, HttpStatus.OK);
	}
	
	@GetMapping("/transaction/verify")
	public ResponseEntity<?> verifyCardDeposit (@RequestParam String transaction_id) {
		TransactionResponse cardTransaction = flutterWaveService.verifyTransaction(transaction_id);
		
		if (cardTransaction.getData().getStatus().equals("success")) {
			String barterId = cardTransaction.getData().getMeta().getBarter_id();
			TransferResponse transferResponse = flutterWaveService.sendMoney(new FlutterwaveTransferRequest(
					"flutterwave",
					barterId,
					cardTransaction.getData().getAmount_settled(),
					"NG",
					"NG",
					null,
					"1234567890qwertyuiop",
					"Fund wallet"
			));
			
			TransactionResponse transferTransaction = flutterWaveService.verifyTransaction(transferResponse.getData().getId());
		}
		
		return new ResponseEntity<>(new Object(), HttpStatus.OK);
	}
}
