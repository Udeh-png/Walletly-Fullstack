package com.walletly.walletly_backend.mappers;

import com.walletly.walletly_backend.dtos.requests.RegistrationRequest;
import com.walletly.walletly_backend.dtos.response.UserResponse;
import com.walletly.walletly_backend.modals.User;

public class Mapper {
	public static UserResponse userToUserResponse (User user) {
		return new UserResponse(
				user.getId(),
				user.getFirstName(),
				user.getLastName(),
				user.getEmail(),
				user.getCreatedAt()
		);
	}
	
	public static User regRequestToUser (RegistrationRequest regReq) {
		return new User(
				regReq.getFirstName(),
				regReq.getLastName(),
				regReq.getEmail(),
				regReq.getPassword()
		);
	}
}
