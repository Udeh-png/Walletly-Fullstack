package com.walletly.walletly_backend.repos;

import com.walletly.walletly_backend.modals.User;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface UserRepo extends MongoRepository<@NonNull User, @NonNull String> {

	public Boolean existsByEmail(String email);
}
