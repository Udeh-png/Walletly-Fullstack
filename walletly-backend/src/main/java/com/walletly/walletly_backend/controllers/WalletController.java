package com.walletly.walletly_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {
	
	@GetMapping("/deposit/transact")
	public ResponseEntity<?> verifyCardDeposit (
			HttpServletRequest request,
			@RequestParam String transaction_id,
			@RequestParam(name = "tx_ref") String cardTxRef) {
		
		return null;
	}
}

/*
String accessToken = Objects.requireNonNull(WebUtils.getCookie(request, CookieType.ACCESS_TOKEN.getName())).getValue();
		
		String userId = jwtService.extractClaim(accessToken, Claims::getSubject);
		
		Optional<Wallet> userWalletOtp = walletRepo.findByUserId(userId);
		
		if (userWalletOtp.isEmpty()) return null;
		
		Wallet userWallet = userWalletOtp.get();
		
		Query query = new Query(Criteria.where("tx_ref").is(cardTxRef));
		Update update = new Update()
				.setOnInsert("status", "PENDING");
		
		FindAndModifyOptions options = new FindAndModifyOptions().upsert(true).returnNew(true);
		
		Transaction transaction = mongoTemplate.findAndModify(query, update, options,Transaction.class, "Transactions");
		
		return new ResponseEntity<>(new Object(), HttpStatus.OK);
*/