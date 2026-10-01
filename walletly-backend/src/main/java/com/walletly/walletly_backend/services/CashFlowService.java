package com.walletly.walletly_backend.services;

import com.walletly.walletly_backend.dtos.requests.InternalTransferRequest;
import com.walletly.walletly_backend.emuns.TransactionStatus;
import com.walletly.walletly_backend.emuns.TransactionType;
import com.walletly.walletly_backend.emuns.TransferIdentifierType;
import com.walletly.walletly_backend.integration.flutterwave.dto.requests.FlutterwaveTransferRequest;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.TransferResponse;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.VerifyTransactionResponse;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.VerifyTransferResponse;
import com.walletly.walletly_backend.models.Transaction;
import com.walletly.walletly_backend.models.Wallet;
import com.walletly.walletly_backend.repos.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Service
public class CashFlowService {
	
	@Autowired
	WalletService walletService;
	@Autowired
	TransferSettlementService settlementService;
	
	@Autowired
	FlutterWaveService flutterWaveService;
	@Autowired
	MongoTemplate mongoTemplate;
	@Autowired
	TransactionRepo transactionRepo;
	
	public Transaction claimTransaction (String reference, TransactionType transactionType) {
		Transaction newTransaction = new Transaction();
		newTransaction.setStatus(TransactionStatus.NEW);
		newTransaction.setType(transactionType);
		newTransaction.setReference(reference);
		newTransaction.setDescription("Card Deposit"); // create the transaction, since the reference field is indexed it won't get created twice by another thread (worker)
		
		try {
			transactionRepo.insert(newTransaction);
		}catch (DuplicateKeyException ignored) {
		}
		
		Query query = new Query(new Criteria().andOperator(
				Criteria.where("reference").is(reference),
				new Criteria().orOperator(
						Criteria.where("status").is(TransactionStatus.NEW),
						Criteria.where("status").is(TransactionStatus.FAILED)
				)
		));
		
		return mongoTemplate.findAndModify(
				query,
				new Update().set("status", TransactionStatus.PROCESSING),
				new FindAndModifyOptions().upsert(false),
				Transaction.class,
				"Transactions"
		);
	}
	
	public Transaction merchantToWallet (Transaction processingTransaction, VerifyTransactionResponse cardTransaction, String userId) {
		BigDecimal amount = cardTransaction.getData().getAmount_settled();
		
		Wallet wallet = walletService.getWalletWithUserId(userId);
		String toWalletTxRef = "WLTY-" + System.currentTimeMillis() + "-" + UUID.randomUUID();
		
		TransferResponse toWalletResponse = flutterWaveService.sendMoney(new FlutterwaveTransferRequest(
				"flutterwave",
				wallet.getBarterId(),
				amount,
				"NGN",
				"NGN",
				null,
				toWalletTxRef,
				""
		));
		
		if (toWalletResponse == null) throw new RuntimeException();
		
		VerifyTransferResponse toWalletTransResponse = flutterWaveService.verifyTransfer(toWalletResponse.getData().getId());
		
		String toWalletTransferStatus = toWalletTransResponse.getData().getStatus();
		
		processingTransaction.setDepositDetails(
				new Transaction.DepositDetails(
						toWalletTxRef,
						cardTransaction.getData()
								.getCard()
				)
		);
		processingTransaction.setSettledAmount(amount);
		if (toWalletTransferStatus.equalsIgnoreCase("FAILED")) {
			processingTransaction.setStatus(TransactionStatus.FAILED);
		} else {
			processingTransaction.setStatus(TransactionStatus.SUCCESSFUL);
			walletService.creditWallet(wallet.getId(), amount);
		}
		
		processingTransaction.getDepositDetails().setToWalletTxRef(toWalletTransResponse.getData().getReference());
		processingTransaction.setCreatedAt(Instant.now());
		transactionRepo.save(processingTransaction);
		
		return processingTransaction;
	}
	
	public Transaction verifyChargeAndFundWallet(String cardTxRef, String userId, String transaction_id) {
		Transaction transaction = claimTransaction(cardTxRef, TransactionType.DEPOSIT);
		
		if (transaction == null) throw new RuntimeException("Transaction is being processed or has been completed");
		
		VerifyTransactionResponse cardTransactionResponse = flutterWaveService.verifyTransaction(transaction_id);
		
		transaction.setUpdatedAt(Instant.now());
		
		if (!cardTransactionResponse.getData().getStatus().equalsIgnoreCase("successful")) {
			transaction.setStatus(TransactionStatus.FAILED);
			transaction.setUpdatedAt(Instant.now());
			
			transactionRepo.save(transaction);
			throw new RuntimeException(String.valueOf(transaction));
		}
		
		return merchantToWallet(transaction, cardTransactionResponse, userId);
	}
	
	public void handleInternalTransfer (InternalTransferRequest transferRequest, String senderUserId) {
		Transaction transaction2Process = claimTransaction("", TransactionType.TRANSFER);
		
		if (transaction2Process == null) throw new RuntimeException("Transaction is being processed or has been completed");
		
		BigDecimal amount = transferRequest.getAmount();
		
		TransferIdentifierType identifierType = transferRequest.getIdentifierType();
		String identifier = transferRequest.getIdentifier();
		Wallet receiverWallet = switch (identifierType) {
			case TransferIdentifierType.WALLETLY_ACC_NUMBER -> walletService.getWalletWithAccountNumber(identifier);
			case TransferIdentifierType.PHONE_NUMBER -> walletService.getWalletWithPhoneNumber(identifier);
			case TransferIdentifierType.EMAIL_ADDRESS -> walletService.getWalletWithEmailAddress(identifier);
		};
		
		Wallet senderWallet = walletService.getWalletWithUserId(senderUserId);
		
		settlementService.settleInternalTransfer(senderWallet.getId(), receiverWallet.getId(), amount);
		
		transaction2Process.setP2PDetails(new Transaction.P2PDetails(
				senderWallet.getId(),
				senderWallet.getAccountName(),
				senderWallet.getVirtualAccountNumber(),
				receiverWallet.getId(),
				receiverWallet.getAccountName(),
				receiverWallet.getVirtualAccountNumber(),
				null
		));
		
		transaction2Process.setUpdatedAt(Instant.now());
	}
	
	@Service
	public static class TransferSettlementService {
		@Autowired
		private WalletService walletService;
		
		@Transactional
		public void settleInternalTransfer (String senderWalletId, String receiverWalletId, BigDecimal amount) {
			walletService.debitWallet(senderWalletId, amount);
			
			walletService.creditWallet(receiverWalletId, amount);
		}
	}
}
