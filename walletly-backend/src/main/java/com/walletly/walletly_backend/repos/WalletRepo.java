package com.walletly.walletly_backend.repos;

import com.walletly.walletly_backend.modals.Wallet;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WalletRepo extends MongoRepository<@NonNull  Wallet, @NonNull ObjectId> {
	Optional<Wallet> findByUserId(String userId);
}
