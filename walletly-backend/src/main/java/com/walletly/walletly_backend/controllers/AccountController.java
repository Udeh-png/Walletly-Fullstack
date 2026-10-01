package com.walletly.walletly_backend.controllers;

import com.walletly.walletly_backend.emuns.CookieType;
import com.walletly.walletly_backend.utils.CookiesUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/account")
public class AccountController {
	@PostMapping("/logout")
	public ResponseEntity<?> logout () {
		ResponseCookie accessTokenCookie = CookiesUtil.deleteCookie(CookieType.ACCESS_TOKEN, "");
		ResponseCookie refreshTokenCookie = CookiesUtil.deleteCookie(CookieType.REFRESH_TOKEN, "");
		
		return ResponseEntity.ok()
				.header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
				.header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
				.build();
	}
}
