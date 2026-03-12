package com.walletly.walletly_backend.services;

import com.resend.core.exception.ResendException;
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
	
	final Long SUSPENSION_TIME = 10 * 60000L;
	
	@Autowired
	private UserRepo repo;
	
	@Autowired
	private OtpManager otpManager;
	
	@Autowired
	private ConcurrentHashMap<String, SuspendedAccount> suspendedAccountMap;
	
	@Scheduled(fixedRate = 15000)
	public void clearStaleUsers () {
		tempUsers.entrySet().removeIf(
				(tempUser) ->
						System.currentTimeMillis() - tempUser.getValue().getTimestamp() >= 60000 * 25 // 1 min
		);
	}
	
	public OtpResponse sendSignUpOtp (TempUser user) throws ResendException {
		if (!repo.findAll().isEmpty() && repo.existsByEmail(user.getEmail())) {
			throw new UserEmailAlreadyExists(user.getEmail());
		}
		
		SuspendedAccount suspended = suspendedAccountMap.get(user.getEmail());
		if (suspended != null) {
			if (suspended.suspensionExpired()) {
				suspendedAccountMap.remove(user.getEmail());
			} else {
				throw new AccountSuspendedException(suspended.getMessage(), suspended.getReason());
			}
		}
		
		TempUser userFromTempUsers = tempUsers.get(user.getEmail());
		
		if (userFromTempUsers == null) {
			user.setId(UUID.randomUUID().toString());
			tempUsers.put(user.getEmail(), user);
			
			OtpSession otpSession = otpManager.validateAndGenerate(user.getEmail(),user.getId());
			
			return new OtpResponse(user.getId(), otpSession.getGenerateTimestamp());
		}
		
		try{
			OtpSession otpSession = otpManager.validateAndGenerate(userFromTempUsers.getEmail(), userFromTempUsers.getId());
			return new OtpResponse(otpSession.getSessionId(), otpSession.getGenerateTimestamp());
			
		} catch (TooManyOtpRequestsException e) {
			SuspendedAccount suspendedAccount = new SuspendedAccount(
					userFromTempUsers.getEmail(),
					System.currentTimeMillis(),
					SUSPENSION_TIME,
					"You have been suspended for too many otp requests",
					e
			);
			suspendedAccountMap.put(userFromTempUsers.getEmail(), suspendedAccount); // add the user to the suspended email map
			otpManager.removeEmailFromMap(userFromTempUsers.getEmail());
			tempUsers.remove(userFromTempUsers.getEmail());
			
			throw new AccountSuspendedException(suspendedAccount.getMessage(), suspendedAccount.getReason());
		}
	}
	
	public OtpResponse resendOtp(String email) throws ResendException {
		String userId = tempUsers.get(email).getId();
		
		try {
			OtpSession otpSession = otpManager.validateAndGenerate(email, userId);
			return new OtpResponse(userId, otpSession.getGenerateTimestamp());
		} catch (TooManyOtpRequestsException tmor) {
			throw new AccountSuspendedException("", tmor);
		}
	}
	
	public Boolean authorizeOtpPageAccess (String userId) {
		System.out.println("Authorize Otp Page Access");
		boolean exists = tempUsers
				.values()
				.stream()
				.anyMatch(
						(user) -> user.getId().equals(userId)
				);
		if (!exists) throw new NotAuthorizedException("");
		
		return true;
	}
}