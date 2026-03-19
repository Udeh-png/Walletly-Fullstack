package com.walletly.walletly_backend.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtService {
	@Value("${jwt.secret}")
	private String secret;
	
	@Value("${jwt.access.expiration}")
	private String accessExpiration;
	
	@Value("${jwt.refresh.expiration}")
	private String refreshExpiration;
	
	private SecretKey getSecretKey () {
		return Keys.hmacShaKeyFor(secret.getBytes());
	}
	
	public String generateAccessToken(String userId) {
		return Jwts.builder()
				.subject(userId)
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + Long.parseLong(accessExpiration)))
				.signWith(getSecretKey())
				.compact();
	}
	
	public String generateRefreshToken (String userId) {
		return Jwts.builder()
				.subject(userId)
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + Long.parseLong(refreshExpiration)))
				.signWith(getSecretKey())
				.compact();
	}
}
