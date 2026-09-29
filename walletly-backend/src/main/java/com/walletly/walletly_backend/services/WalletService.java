package com.walletly.walletly_backend.services;

import com.walletly.walletly_backend.emuns.TransactionDirection;
import com.walletly.walletly_backend.emuns.TransactionStatus;
import com.walletly.walletly_backend.emuns.TransactionType;
import com.walletly.walletly_backend.integration.flutterwave.dto.requests.FlutterwaveTransferRequest;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.VerifyTransactionResponse;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.TransferResponse;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.VerifyTransferResponse;
import com.walletly.walletly_backend.models.Transaction;
import com.walletly.walletly_backend.models.Wallet;
import com.walletly.walletly_backend.repos.TransactionRepo;
import com.walletly.walletly_backend.repos.WalletRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

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
	
	public void creditWallet (String walletId, BigDecimal amount) {
		walletRepo.incrementWalletBalance(walletId, amount);
	}
}
