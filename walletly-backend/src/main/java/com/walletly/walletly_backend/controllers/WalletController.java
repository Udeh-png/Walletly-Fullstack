package com.walletly.walletly_backend.controllers;

import com.walletly.walletly_backend.models.Transaction;
import com.walletly.walletly_backend.services.JwtService;
import com.walletly.walletly_backend.services.WalletService;
import com.walletly.walletly_backend.utils.CookieType;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {
	@Autowired
	WalletService walletService;
	@Autowired
	JwtService jwtService;
	
	@PostMapping("/deposit/initiate")
	public ResponseEntity<@NonNull Map<String, String>> generateTxRef () {
		String txRef = "WLTY-" + System.currentTimeMillis() + "-" + UUID.randomUUID();
		
		Map<String, String> responseMap = new HashMap<>();
		responseMap.put("txRef", txRef);
		
		return ResponseEntity.ok(responseMap);
	}
	
	@PostMapping("/deposit/process")
	public ResponseEntity<?> verifyCardDeposit (
			HttpServletRequest request,
			@RequestParam String transaction_id,
			@RequestParam(name = "tx_ref") String cardTxRef
	){
		Cookie accessTokenCookie = WebUtils.getCookie(request, CookieType.ACCESS_TOKEN.getName());
		
		assert accessTokenCookie != null;
		String userId = jwtService.extractClaim(accessTokenCookie.getValue(), Claims::getSubject);
		
		Transaction processedTransaction = walletService.verifyChargeAndFundWallet(cardTxRef, userId, transaction_id);
		
		return ResponseEntity.ok(processedTransaction);
	}
}
