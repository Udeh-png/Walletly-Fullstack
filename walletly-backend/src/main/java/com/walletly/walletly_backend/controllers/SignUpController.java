package com.walletly.walletly_backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignUpController {
	@GetMapping("/get-something")
	public ResponseEntity<String> get () {
		return ResponseEntity.ok("It Responded");
	}
	
	@PostMapping("/post-something")
	public ResponseEntity<String> post () {
		return ResponseEntity.ok("It Responded");
	}
}