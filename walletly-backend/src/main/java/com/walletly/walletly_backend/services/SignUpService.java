package com.walletly.walletly_backend.services;

import com.resend.core.exception.ResendException;
import com.walletly.walletly_backend.dtos.JwtTokenResponse;
import com.walletly.walletly_backend.modals.User;
import com.walletly.walletly_backend.modals.Wallet;
import com.walletly.walletly_backend.repos.WalletRepo;
import com.walletly.walletly_backend.dtos.OtpResponse;
import com.walletly.walletly_backend.dtos.RegisterRequest;
import com.walletly.walletly_backend.exceptions.*;
import com.walletly.walletly_backend.repos.UserRepo;
import com.walletly.walletly_backend.utils.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
@EnableScheduling
public class SignUpService {
	private final ConcurrentHashMap<String, RegisterRequest> tempUsers = new ConcurrentHashMap<>();
	
	final Long SUSPENSION_TIME = 10 * 60000L;
	
	@Value("${jwt.access.expiration}")
	private String accessTokenExp;
	
	@Value("${jwt.refresh.expiration}")
	private String refreshTokenExp;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private WalletRepo walletRepo;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	JwtService jwtService;
	
	@Autowired
	private OtpService otpService;
	
	@Autowired
	private ConcurrentHashMap<String, SuspendedAccount> suspendedAccountMap;
	
	@Scheduled(fixedRate = 15000)
	public void clearStaleUsers () {
		tempUsers.entrySet().removeIf(
				(tempUser) ->
						System.currentTimeMillis() - tempUser.getValue().getTimestamp() >= 60000 * 25 // 25 mins
		);
	}
	
	public OtpResponse sendSignUpOtp (RegisterRequest user) throws ResendException {
		if (!userRepo.findAll().isEmpty() && userRepo.existsByEmail(user.getEmail())) {
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
		
		RegisterRequest userFromTempUsers = tempUsers.get(user.getEmail());
		
		if (userFromTempUsers == null) {
			user.setId(UUID.randomUUID().toString());
			tempUsers.put(user.getEmail(), user);
			
			OtpSession otpSession = otpService.validateAndGenerate(user.getEmail(),user.getId());
			
			return new OtpResponse(user.getId(), otpSession.getGenerateTimestamp());
		}
		
		try{
			OtpSession otpSession = otpService.validateAndGenerate(userFromTempUsers.getEmail(), userFromTempUsers.getId());
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
			otpService.removeEmailFromMap(userFromTempUsers.getEmail());
			tempUsers.remove(userFromTempUsers.getEmail());
			
			throw new AccountSuspendedException(suspendedAccount.getMessage(), suspendedAccount.getReason());
		}
	}
	
	public OtpResponse resendOtp(String email) throws ResendException {
		RegisterRequest user = tempUsers.get(email);
		
		if (user == null) throw new UserSessionNotFoundException();
		
		String userId = user.getId();
		try {
			OtpSession otpSession = otpService.validateAndGenerate(email, userId);
			return new OtpResponse(userId, otpSession.getGenerateTimestamp());
		} catch (TooManyOtpRequestsException tmor) {
			throw new AccountSuspendedException("", tmor);
		}
	}
	
	public JwtTokenResponse validateUser (String email, String otp, HttpServletResponse response) {
		RegisterRequest userDto = tempUsers.get(email);
		
		if (userDto == null) throw new UserSessionNotFoundException();
		
		otpService.verifyOtp(userDto.getEmail(), otp);
		
		String encodedPassword = passwordEncoder.encode(userDto.getPassword());
		
		assert encodedPassword != null;
		
		User user = new User(
				userDto.getFirstname(),
				userDto.getLastname(),
				userDto.getEmail(),
				encodedPassword,
				new ArrayList<>(),
				LocalDateTime.now()
		);
		userRepo.insert(user);
		
		Wallet wallet = new Wallet(
				user.getId(),
				0.00,
				LocalDateTime.now(),
				"Naira"
		);
		
		walletRepo.insert(wallet);
		tempUsers.remove(email);
		otpService.removeEmailFromMap(email);

		String accessToken = jwtService.generateAccessToken(user.getId().toString());
		String refreshToken = jwtService.generateRefreshToken(user.getId().toString());
		
		return new JwtTokenResponse(accessToken, refreshToken, "Bearer");
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