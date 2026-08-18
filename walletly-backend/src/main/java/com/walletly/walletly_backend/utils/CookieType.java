package com.walletly.walletly_backend.utils;

import lombok.Getter;

@Getter
public enum CookieType {
	ACCESS_TOKEN("ACCESS_TOKEN", 24 * 60 * 60),
	REFRESH_TOKEN("REFRESH_TOKEN", 2 * 24 * 60 * 60);
	
	private final String name;
	private final int maxAgeSeconds;
	
	CookieType (String name, int maxAgeSeconds) {
		this.name = name;
		this.maxAgeSeconds = maxAgeSeconds;
	}
}
