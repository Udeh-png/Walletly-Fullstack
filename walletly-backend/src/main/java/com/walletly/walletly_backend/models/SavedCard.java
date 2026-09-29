package com.walletly.walletly_backend.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "SavedCards")
@RequiredArgsConstructor
@Getter
public class SavedCard {
	@Id
	private String id;
}
