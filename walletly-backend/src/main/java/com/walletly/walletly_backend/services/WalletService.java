package com.walletly.walletly_backend.services;

import com.walletly.walletly_backend.integration.flutterwave.dto.requests.FlutterwaveTransferRequest;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.TransactionResponse;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.TransferResponse;
import com.walletly.walletly_backend.modals.Wallet;
import com.walletly.walletly_backend.repos.WalletRepo;
import com.walletly.walletly_backend.dtos.requests.InitiateDepositRequest;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class WalletService {
	@Autowired
	JwtService jwtService;
	@Autowired
	WalletRepo walletRepo;
	@Autowired
	FlutterWaveService flutterWaveService;
	
	@Autowired
	RedisTemplate<String, String> redisTemplate;
	@Autowired
	ObjectMapper objectMapper;
	
	public void storeDepositRequest (InitiateDepositRequest initiateFunding, String txRef) {
		redisTemplate.opsForValue().set(
				"initiate:funding" + txRef,
				objectMapper.writeValueAsString(initiateFunding),
				10,
				TimeUnit.MINUTES
		);
	}
	
	public String initiateDeposit (String jwt, double amount) {
		
		String userId = jwtService.extractClaim(jwt,Claims::getSubject);
		
		Optional<Wallet> userWalletOtp = walletRepo.findByUserId(userId);
		
		if (userWalletOtp.isEmpty()) return null;
		
		Wallet userWallet = userWalletOtp.get();
		String barter_id = userWallet.getBarterId();
		String tx_ref = "WTLY-" + System.currentTimeMillis() + "-" + UUID.randomUUID();
		
		storeDepositRequest(
				new InitiateDepositRequest( amount, barter_id, true, tx_ref, userId ),
				tx_ref
		);
		
		return tx_ref;
	}
	
	public void fundWallet (String walletId, double amount) {
		walletRepo.incrementWalletBalance(walletId, amount);
	}
	
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
		
		return transferResponse.getData().getId();
	}
}
