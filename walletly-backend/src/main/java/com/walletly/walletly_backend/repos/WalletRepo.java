package com.walletly.walletly_backend.repos;

import com.walletly.walletly_backend.models.Wallet;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface WalletRepo extends MongoRepository<@NonNull  Wallet, @NonNull String> {
	Optional<Wallet> findByUserId(String userId);
	
	Optional<Wallet> findByVirtualAccountNumber (String accountNumber);
	
	Optional<Wallet> findByMobileNumber (String phoneNumber);
	
	Optional<Wallet> findByEmailAddress (String emailAddress);
	
	@Query("{ '_id': ?0 }")
	@Update("{ '$inc': { 'balance': ?1 } }")
	void incrementWalletBalance (String walletId, BigDecimal incBy);
	
	@Query("{ '_id': ?0, 'balance': { '$gt': ?1 } } ")
	@Update("{ '$inc': { 'balance': ?1 } }")
	void decrementWalletBalance (String walletId, BigDecimal decBy);
}
