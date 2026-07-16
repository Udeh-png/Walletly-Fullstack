package com.walletly.walletly_backend.controllers;

import com.walletly.walletly_backend.integration.flutterwave.dto.response.TransactionResponse;
import com.walletly.walletly_backend.services.FlutterWaveService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/app")
public class MainController {
	@Autowired
	FlutterWaveService flutterWaveService;
	
	@GetMapping("/verify-card-deposit")
	public ResponseEntity<@NonNull TransactionResponse> verifyCardDeposit (@RequestParam String transaction_id) {
		System.out.println(transaction_id);
		return new ResponseEntity<>(flutterWaveService.confirmCardDeposit(transaction_id), HttpStatus.OK);
	}
}
