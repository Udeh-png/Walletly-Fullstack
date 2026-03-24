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
	
	public OtpResponse takeInfoVerifyEmail(RegisterRequest user) throws ResendException, UserSessionNotFoundException {
		String userEmail = user.getEmail();
		
		validateRegistrationEligibility(userEmail);
		
		if (tempUsers.get(userEmail) == null) {
			return initiateRegistration(user);
		}
		
		return resendOtp(userEmail);
	}
	
	public void validateRegistrationEligibility (String email) {
		if (!userRepo.findAll().isEmpty() && userRepo.existsByEmail(email)) {
			throw new UserEmailAlreadyExists(email);
		}
		
		SuspendedAccount suspended = suspendedAccountMap.get(email);
		if (suspended != null) {
			if (suspended.suspensionExpired()) {
				suspendedAccountMap.remove(email);
			} else {
				throw new AccountSuspendedException(suspended.getMessage(), suspended.getReason());
			}
		}
	}
	
	public OtpResponse initiateRegistration (RegisterRequest user) throws UserSessionNotFoundException, ResendException {
		user.setId(UUID.randomUUID().toString());
		tempUsers.put(user.getEmail(), user);
		
		OtpSession otpSession = otpService.generateOtp();
		otpService.send(user.getEmail(), otpSession);
		
		return new OtpResponse(otpSession.getGenerateTimestamp());
	}
	
	public OtpResponse resendOtp(String email) throws ResendException, UserSessionNotFoundException {
		RegisterRequest user = tempUsers.get(email);
		
		if (user == null || !otpService.hasOtpSession(email)) throw new UserSessionNotFoundException();
		
		if (otpService.hasReachedLimit(email)) {
			SuspendedAccount newSuspendedAccount = new SuspendedAccount(
					email,
					System.currentTimeMillis(),
					60000L * 120,
					"",
					new TooManyOtpRequestsException(),
					10L
			);
			
			suspendedAccountMap.put(email, newSuspendedAccount);
			tempUsers.remove(email);
			otpService.removeEmailFromMap(email);
			
			throw new TooManyOtpRequestsException();
		};
		
		OtpSession currentSession = otpService.getSessions(email).getLast();
		
		if (!currentSession.hasExpired()) throw new OtpSessionStillActiveException();
		
		OtpSession otpSession = otpService.generateOtp();
		otpService.send(email, otpSession);
		return new OtpResponse(otpSession.getGenerateTimestamp());
	}
	
	public JwtTokenResponse validateUser (String email, String otp, HttpServletResponse response)throws UserSessionNotFoundException {
		RegisterRequest userDto = tempUsers.get(email);
		
		if (userDto == null || !otpService.hasOtpSession(email)) throw new UserSessionNotFoundException();
		
		OtpSession currentSession = otpService.getSessions(email).getLast();
		
		if (currentSession.hasExceededAttemptLimit()) {
			SuspendedAccount newSuspendedAccount = new SuspendedAccount(
					email,
					System.currentTimeMillis(),
					60000L * 120,
					"",
					new TooManyOtpRequestsException(),
					10L
			);
			
			suspendedAccountMap.put(email, newSuspendedAccount);
			tempUsers.remove(email);
			otpService.removeEmailFromMap(email);
			
			throw new TooManyOtpAttemptsException();
		}
		
		if (currentSession.hasExpired()) throw new OtpHasExpiredException();
		
		if (!otpService.otpIsValid(userDto.getEmail(), otp)) throw new OtpMissMatchException();
		
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
}