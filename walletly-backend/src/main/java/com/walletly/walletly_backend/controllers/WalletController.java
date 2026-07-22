package com.walletly.walletly_backend.controllers;

import com.walletly.walletly_backend.integration.flutterwave.dto.requests.FlutterwaveTransferRequest;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.TransactionResponse;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.TransferResponse;
import com.walletly.walletly_backend.modals.Transaction;
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
	
	@GetMapping("/deposit/transact")
	public ResponseEntity<?> verifyCardDeposit (@RequestParam String transaction_id) {
		TransactionResponse cardTransaction = flutterWaveService.verifyTransaction(transaction_id);
		
		System.out.println(cardTransaction.getStatus());
		if (cardTransaction.getData().getStatus().equals("success")) {
			walletService.sendMoneyToWallet(cardTransaction);
		}
		
		return new ResponseEntity<>(new Object(), HttpStatus.OK);
	}
}

/*
	@GetMapping("/deposit/transact")
public ResponseEntity<?> verifyCardDeposit (@RequestParam String transaction_id) {
  TransactionResponse cardTransaction = flutterWaveService.verifyTransaction(transaction_id);
  TransactionResponse toWalletTransaction = null;
  if (cardTransaction.getData().getStatus().equals("success")) {
   walletService.sendMoneyToWallet(cardTransaction);
  }
  
  return new ResponseEntity<>(new Object(), HttpStatus.OK);
}

this is my actual endpoint that i hit in flutter inline's callback when the card charging is done, i verify the transaction with flutterwave's /verify endpoint and then if the transaction was successful i call this: 

public String sendMoneyToWallet (TransactionResponse cardTransaction) {
  String depositReqJson = redisTemplate.opsForValue().get("");
  InitiateDepositRequest depositRequest = objectMapper.convertValue(depositReqJson, InitiateDepositRequest.class);
  String barterId = depositRequest.getBarter_id();
  
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
  
  TransactionResponse response = flutterWaveService.verifyTransaction(transferResponse.getData().getId());
  
  if (response.getStatus().equals("success")) {
   Optional<Wallet> walletOpt = walletRepo.findByUserId(depositRequest.getUser_id());
   assert walletOpt.isPresent();
   
   Wallet wallet = walletOpt.get();
   
   fundWallet(wallet.getId(), response.getData().getAmount_settled());
  }

fundWallet()​ is what actually calls that spring data mongo method, i was thinking of this threads stuff and was thinking what if they hit the deposit/transact​ endpoint multiple times but that wont be a problem would it?? cuz its the inline stuff that calling it
*/