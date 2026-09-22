package com.walletly.walletly_backend.repos;

import com.walletly.walletly_backend.models.Wallet;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WalletRepo extends MongoRepository<@NonNull  Wallet, @NonNull String> {
	Optional<Wallet> findByUserId(String userId);
	
	@Query("{ '_id': ?0 }")
	@Update("{ '$inc': { 'balance': ?1 } }")
	void incrementWalletBalance (String wallerId, double incBy);
}
