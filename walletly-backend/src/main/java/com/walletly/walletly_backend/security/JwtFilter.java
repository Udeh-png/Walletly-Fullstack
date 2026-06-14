package com.walletly.walletly_backend.security;

import com.walletly.walletly_backend.services.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NullMarked;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {
	@Autowired
	JwtService jwtService;
	@Autowired
	MyUserDetailsService userDetailsService;
	
	@NullMarked
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authHeader = request.getHeader("Authorization");
		String username = null;
		String jwtToken = null;
		
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			jwtToken = authHeader.substring(7);
			username = jwtService.extractClaim(jwtToken, Claims::getSubject);
		}
		
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			MyUserDetails userDetails = (MyUserDetails)userDetailsService.loadUserByUsername(username);
			if (jwtService.tokenIsValid(jwtToken, userDetails.getUser())) {
				UsernamePasswordAuthenticationToken userToken =
						new UsernamePasswordAuthenticationToken(userDetails, null, null);
				
				userToken.setDetails(userDetails);
				
				SecurityContextHolder.getContext()
						.setAuthentication(userToken);
			}
		}
		
		filterChain.doFilter(request, response);
	}
}
