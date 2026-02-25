package com.walletly.walletly_backend.utils;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TempUser {
	private String id;
	private String email;
	private String password;
	private String firstName;
	private String lastName;
	private final Long timestamp = System.currentTimeMillis();
}