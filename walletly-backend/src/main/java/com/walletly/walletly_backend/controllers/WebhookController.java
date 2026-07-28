package com.walletly.walletly_backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/webhooks")
public class WebhookController {
	@PostMapping("/webhook-handler")
	public ResponseEntity<?> handleWebhooks (@RequestBody Object payload) {
		System.out.println("webhook called");
		System.out.println(payload);
		return ResponseEntity.ok(payload);
	}
}
