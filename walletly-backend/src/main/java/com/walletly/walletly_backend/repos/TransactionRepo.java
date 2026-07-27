package com.walletly.walletly_backend.repos;

import com.walletly.walletly_backend.modals.Transaction;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepo extends MongoRepository<@NonNull Transaction, @NonNull String> {
}
