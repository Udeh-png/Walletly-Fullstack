package com.walletly.walletly_backend.services;

import com.walletly.walletly_backend.integration.flutterwave.dto.requests.FlutterwaveTransferRequest;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.TransactionResponse;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.TransferResponse;
import com.walletly.walletly_backend.modals.Wallet;
import com.walletly.walletly_backend.repos.WalletRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class WalletService {
	@Autowired
	WalletRepo walletRepo;
	
	@Autowired
	FlutterWaveService flutterWaveService;
	
	public void fundWallet (String walletId, double amount) {
		Optional<Wallet> walletOpt = walletRepo.findById(walletId);
		assert walletOpt.isPresent();
		
		Wallet wallet = walletOpt.get();
		
		walletRepo.incrementWalletBalance(wallet.getId(), amount);
	}
	
	public TransactionResponse sendMoneyToWallet (TransactionResponse cardTransaction) {
		String toWalletTxRef = "WTLY-" + System.currentTimeMillis() + "-" + UUID.randomUUID();
		double amount = cardTransaction.getData().getAmount_settled();
		
		TransferResponse transferResponse = flutterWaveService.sendMoney(new FlutterwaveTransferRequest(
				"flutterwave",
				"",
				amount,
				"NG",
				"NG",
				null,
				toWalletTxRef,
				"Fund wallet"
		));
		
		return flutterWaveService.verifyTransaction(transferResponse.getData().getId());
	}
}
