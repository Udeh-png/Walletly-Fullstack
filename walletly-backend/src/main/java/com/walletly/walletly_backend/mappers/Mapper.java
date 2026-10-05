package com.walletly.walletly_backend.mappers;

import com.walletly.walletly_backend.dtos.requests.RegistrationRequest;
import com.walletly.walletly_backend.dtos.response.UserResponse;
import com.walletly.walletly_backend.dtos.response.WalletResponse;
import com.walletly.walletly_backend.integration.flutterwave.dto.requests.CreatePsaRequest;
import com.walletly.walletly_backend.integration.flutterwave.dto.response.CreatePsaResponse;
import com.walletly.walletly_backend.models.User;
import com.walletly.walletly_backend.models.Wallet;
import lombok.NonNull;

import java.math.BigDecimal;

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
	
	public static CreatePsaRequest registrationRequestToCreatePsaRequest(@NonNull RegistrationRequest registrationRequest) {
		return new CreatePsaRequest(
				registrationRequest.getFirstName() + " " + registrationRequest.getLastName(),
				registrationRequest.getEmail(),
				"NG",
				"035",
				"08081169830"
		);
	}
	
	public static Wallet mapToWallet (@NonNull User user, @NonNull CreatePsaResponse createPsaResponse) {
		return new Wallet(
				user.getId(),
				createPsaResponse.getData().getAccount_name(),
				new BigDecimal("0.0"),
				createPsaResponse.getData().getNuban(),
				user.getEmail(),
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
	
	public static WalletResponse wallerToWalletResponse(Wallet receiverWallet) {
		
		return new WalletResponse(
				receiverWallet.getId(),
				receiverWallet.getAccountName(),
				receiverWallet.getVirtualAccountNumber(),
				receiverWallet.getEmail(),
				receiverWallet.getMobileNumber()
		);
	}
}
