package com.walletly.walletly_backend.repos;

import com.walletly.walletly_backend.dtos.requests.RegistrationRequest;
import com.walletly.walletly_backend.modals.PreRegUser;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PreRegUserRepo extends MongoRepository<@NonNull PreRegUser, @NonNull String> {
}
