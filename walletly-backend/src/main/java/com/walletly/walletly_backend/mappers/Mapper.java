package com.walletly.walletly_backend.mappers;

import com.walletly.walletly_backend.dtos.requests.RegistrationRequest;
import com.walletly.walletly_backend.dtos.response.UserResponse;
import com.walletly.walletly_backend.integration.flutterwave.dto.requests.CreatePsaRequest;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.CreatePsaResponse;
import com.walletly.walletly_backend.modals.User;
import com.walletly.walletly_backend.modals.Wallet;
import lombok.NonNull;

public class Mapper {
	public static UserResponse userToUserResponse (@NonNull User user) {
		return new UserResponse(
				user.getId(),
				user.getFirstName(),
				user.getLastName(),
				user.getEmail(),
				user.getCreatedAt()
		);
	}
	
	public static User regRequestToUser (@NonNull RegistrationRequest regReq) {
		return new User(
				regReq.getFirstName(),
				regReq.getLastName(),
				regReq.getEmail(),
				regReq.getPassword()
		);
	}
	
	public static CreatePsaRequest regReqToCreatePsaRequest(@NonNull RegistrationRequest user) {
		return new CreatePsaRequest(
				user.getFirstName() + " " + user.getLastName(),
				user.getEmail(),
				"NG"
		);
	}
	
	public static Wallet mapToWallet (@NonNull User user, @NonNull CreatePsaResponse createPsaResponse) {
		return new Wallet(
				user.getId(),
				createPsaResponse.getData().getAccount_name(),
				0,
				createPsaResponse.getData().getNuban(),
				createPsaResponse.getData().getBank_name(),
				createPsaResponse.getData().getBarter_id(),
				createPsaResponse.getData().getAccount_reference(),
				createPsaResponse.getData().getId(),
				createPsaResponse.getData().getEmail(),
				createPsaResponse.getData().getCountry(),
				createPsaResponse.getStatus(),
				createPsaResponse.getData().getCreated_at()
		);
	}
}
