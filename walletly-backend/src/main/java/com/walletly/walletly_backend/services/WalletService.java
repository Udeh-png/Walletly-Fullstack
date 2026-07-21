package com.walletly.walletly_backend.services;

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
	RedisTemplate<String, String> redisTemplate;
	@Autowired
	ObjectMapper objectMapper;
	
	public void storeDepositRequest (InitiateDepositRequest initiateFunding) {
		redisTemplate.opsForValue().set("initiate_funding",  objectMapper.writeValueAsString(initiateFunding),10, TimeUnit.MINUTES);
	}
	
	public String initiateDeposit (String jwt, double amount) {
		
		String userId = jwtService.extractClaim(jwt,Claims::getSubject);
		
		Optional<Wallet> userWalletOtp = walletRepo.findByUserId(userId);
		
		if (userWalletOtp.isEmpty()) return null;
		
		Wallet userWallet = userWalletOtp.get();
		String barter_id = userWallet.getBarterId();
		String tx_ref = "WTLY-" + System.currentTimeMillis() + "-" + UUID.randomUUID();
		
		storeDepositRequest(new InitiateDepositRequest(amount, barter_id, true, tx_ref, userId));
		
		return tx_ref;
	}
}
