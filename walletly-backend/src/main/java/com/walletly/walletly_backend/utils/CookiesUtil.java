package com.walletly.walletly_backend.utils;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;

public class CookiesUtil {
	public static void createJwtCookies (HttpServletResponse response, CookieType type, String jwtValue) {
		ResponseCookie cookie = ResponseCookie.from(type.getName(), jwtValue)
				.httpOnly(true)
				.secure(true)
				.path("/")
				.sameSite("Strict")
				.maxAge(type.getMaxAgeSeconds())
				.build();
		
		response.addHeader("Set-Cookie", cookie.toString());
	}
	
	public static void clearJwtCookies (HttpServletResponse response, CookieType type, String jwtValue) {
		ResponseCookie cookie = ResponseCookie.from(type.getName(), jwtValue)
				.httpOnly(true)
				.secure(true)
				.path("/")
				.sameSite("Strict")
				.maxAge(0)
				.build();
		
		response.addHeader("Set-Cookie", cookie.toString());
	}
}
