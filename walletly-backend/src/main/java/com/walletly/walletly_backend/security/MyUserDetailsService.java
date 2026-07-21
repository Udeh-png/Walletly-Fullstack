package com.walletly.walletly_backend.security;

import com.walletly.walletly_backend.repos.UserRepo;
import org.jspecify.annotations.NullMarked;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
	@Autowired
	UserRepo repo;
	
	@Override
	@NullMarked
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
		return repo.findById(userId)
				.map(MyUserDetails::new)
				.orElseThrow(
						() -> new UsernameNotFoundException("Wrong Credentials")
				);
	}
}
