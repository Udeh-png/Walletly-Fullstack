package com.walletly.walletly_backend.services;

import com.walletly.walletly_backend.integration.flutterwave.dto.requests.FlutterwaveTransferRequest;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.VerifyTransactionResponse;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.TransferResponse;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.VerifyTransferResponse;
import com.walletly.walletly_backend.modals.Transaction;
import com.walletly.walletly_backend.modals.Wallet;
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

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class WalletService {
	@Autowired
	WalletRepo walletRepo;
	@Autowired
	FlutterWaveService flutterWaveService;
	@Autowired
	MongoTemplate mongoTemplate;
	@Autowired
	TransactionRepo transactionRepo;
	
	public void creditWallet (String walletId, double amount) {
		Optional<Wallet> walletOpt = walletRepo.findById(walletId);
		assert walletOpt.isPresent();
		
		Wallet wallet = walletOpt.get();
		
		walletRepo.incrementWalletBalance(wallet.getId(), amount);
	}
	
	public Transaction verifyChargeAndFundWallet(String cardTxRef, String userId, String transaction_id) {
		Transaction transaction = claimTransaction(cardTxRef);
		
		if (transaction == null) throw new RuntimeException("Transaction Is Being Processed");
		
		VerifyTransactionResponse cardTransactionResponse = flutterWaveService.verifyTransaction(transaction_id);
		
		if (!cardTransactionResponse.getData().getStatus().equalsIgnoreCase("successful")) {
			transaction.setStatus("FAILED");
			transaction.setCreatedAt(Instant.now());
			
			transactionRepo.save(transaction);
			throw new RuntimeException(String.valueOf(transaction));
		}
		
		Transaction processedTransaction = merchantToWallet(transaction, cardTransactionResponse, userId);
		
		transactionRepo.save(processedTransaction);
		
		return processedTransaction;
	}
	
	public Transaction claimTransaction (String txRef) {
		Transaction newTransaction = new Transaction();
		newTransaction.setStatus("NEW");
		newTransaction.setType("CARD");
		newTransaction.setDirection("CREDIT");
		newTransaction.setCardTxRef(txRef);
		newTransaction.setDescription("Card Deposit"); // create the transaction, since the reference field is indexed it won't get created twice by another thread (worker)
		
		try {
			transactionRepo.insert(newTransaction);
		}catch (DuplicateKeyException ignored) {
		}
		
		Query query = new Query(Criteria.where("card_tx_ref").is(txRef).and("status").is("NEW"));
		
		return mongoTemplate.findAndModify(
				query,
				new Update().set("status", "PROCESSING"),
				new FindAndModifyOptions().upsert(false),
				Transaction.class,
				"Transactions"
		);
	}
	
	public Transaction merchantToWallet (Transaction processingTransaction, VerifyTransactionResponse cardTransaction, String userId) {
		double amount = cardTransaction.getData().getAmount_settled();
		
		Optional<Wallet> walletOpt = walletRepo.findByUserId(userId);
		
		Wallet wallet = walletOpt.orElseThrow(RuntimeException::new);
		String toWalletTxRef = "WLTY-" + System.currentTimeMillis() + "-" + UUID.randomUUID();
		
		TransferResponse toWalletResponse = flutterWaveService.sendMoney(new FlutterwaveTransferRequest(
				"flutterwave",
				wallet.getBarterId(),
				cardTransaction.getData().getAmount_settled(),
				"NGN",
				"NGN",
				null,
				toWalletTxRef,
				""
		));
		
		if (toWalletResponse == null) throw new RuntimeException();
		
		VerifyTransferResponse toWalletTransResponse = flutterWaveService.verifyTransfer(toWalletResponse.getData().getId());
		
		String toWalletTransferStatus = toWalletTransResponse.getData().getStatus();
		
		if (toWalletTransferStatus.equalsIgnoreCase("successful")) {
			processingTransaction.setStatus("SUCCESS");
			creditWallet(wallet.getId(), amount);
		} else if (toWalletTransferStatus.equalsIgnoreCase("FAILED")){
			processingTransaction.setStatus("FAILED");
		} else {
			processingTransaction.setStatus("PROCESSING");
		}
		
		processingTransaction.setToWalletTxRef(toWalletTransResponse.getData().getReference());
		processingTransaction.setCreatedAt(Instant.now());
		
		return processingTransaction;
	}
}
