package com.walletly.walletly_backend.utils;

import lombok.Getter;

@Getter
public enum CookieType {
	ACCESS_TOKEN("ACCESS_TOKEN", 864000),
	REFRESH_TOKEN("REFRESH_TOKEN", 1728000);
	
	private final String name;
	private final int maxAgeSeconds;
	
	CookieType (String name, int maxAgeSeconds) {
		this.name = name;
		this.maxAgeSeconds = maxAgeSeconds;
	}
}
