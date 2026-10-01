package com.walletly.walletly_backend.services;

import com.walletly.walletly_backend.models.Wallet;
import com.walletly.walletly_backend.repos.WalletRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class WalletService {
	@Autowired
	WalletRepo walletRepo;
	
	public Wallet getWalletWithUserId (String userId) {
		Optional<Wallet> walletOpt = walletRepo.findByUserId(userId);
		
		return walletOpt.orElseThrow(RuntimeException::new);
	}
	
	public Wallet getWalletWithId (String walletId) {
		Optional<Wallet> walletOpt = walletRepo.findById(walletId);
		
		return walletOpt.orElseThrow(RuntimeException::new);
	}
	
	public Wallet getWalletWithAccountNumber (String accountNumber) {
		Optional<Wallet> walletOpt = walletRepo.findById(accountNumber);
		
		return walletOpt.orElseThrow(RuntimeException::new);
	}
	
	public Wallet getWalletWithPhoneNumber (String phoneNumber) {
		Optional<Wallet> walletOpt = walletRepo.findById(phoneNumber);
		
		return walletOpt.orElseThrow(RuntimeException::new);
	}
	
	public Wallet getWalletWithEmailAddress (String emailAddress) {
		Optional<Wallet> walletOpt = walletRepo.findById(emailAddress);
		
		return walletOpt.orElseThrow(RuntimeException::new);
	}
	
	public void creditWallet (String walletId, BigDecimal amount) {
		walletRepo.incrementWalletBalance(walletId, amount);
	}
	
	public void debitWallet(String walletId, BigDecimal amount) {
		walletRepo.decrementWalletBalance(walletId, amount);
	}
}
