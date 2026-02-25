package com.walletly.walletly_backend.services;

import com.walletly.walletly_backend.exceptions.*;
import com.walletly.walletly_backend.repos.UserRepo;
import com.walletly.walletly_backend.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
@EnableScheduling
public class SignUpService {
	private final ConcurrentHashMap<String, TempUser> tempUsers = new ConcurrentHashMap<>();
	
	@Autowired
	private UserRepo repo;
	
	@Autowired
	private OtpManager otpManager;
	
	@Scheduled(fixedRate = 15000)
	public void clearStaleUsers () {
		tempUsers.entrySet().removeIf(
				(e) ->
						System.currentTimeMillis() - e.getValue().getTimestamp() >= 60000 // 1 min
		);
	}
	
	public OtpResponse sendSignUpOtp (TempUser user) {
		SuspendedAccount suspended = otpManager.getSuspendedAccount(user.getEmail());
		if (suspended != null) {
			if (suspended.suspensionExpired()) {
				otpManager.removeSuspension(user.getEmail());
				System.out.println("Removed from suspended");
			} else {
				System.out.println("Email already suspended for too many requests");
				throw new AccountSuspendedException(suspended.getReason());
			}
		}
		
		if (!repo.findAll().isEmpty() && repo.existsByEmail(user.getEmail())) {
			throw new UserEmailAlreadyExists(user.getEmail());
		}
		
		TempUser userInTempUsers = tempUsers.get(user.getEmail());
		
		if (userInTempUsers == null) {
			user.setId(UUID.randomUUID().toString());
			tempUsers.put(user.getEmail(), user);
			
			OtpSession otpSession = otpManager.generateAndValidate(user.getEmail(),user.getId());
			
			return new OtpResponse(user.getId(), otpSession.getGenerateTimestamp());
		}
		
		OtpSession otpSession = otpManager.generateAndValidate(userInTempUsers.getEmail(),userInTempUsers.getId());
		
		return new OtpResponse(otpSession.getSessionId(), otpSession.getGenerateTimestamp());
	}
	
	public Boolean authorizeOtpPageAccess (String userId) {
		boolean exists = tempUsers
				.values()
				.stream()
				.anyMatch(
						(user) -> user.getId().equals(userId)
				);
		
		if (!exists) throw new NotAuthorized();
		
		return true;
	}
}