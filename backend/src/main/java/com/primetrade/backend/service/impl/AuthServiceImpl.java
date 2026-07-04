package com.primetrade.backend.service.impl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.primetrade.backend.dto.LoginRequest;
import com.primetrade.backend.dto.LoginResponse;
import com.primetrade.backend.dto.RegisterRequest;
import com.primetrade.backend.entity.Role;
import com.primetrade.backend.entity.User;
import com.primetrade.backend.repository.UserRepository;
import com.primetrade.backend.service.AuthService;
import com.primetrade.backend.util.JwtUtil;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtUtil jwtUtil;

    @Override
    public String register(RegisterRequest request) {

    	if (userRepository.findByEmail(request.getEmail()).isPresent()) {
    	    return "Email already exists";
    	}
    	User user = new User();

    	user.setName(request.getName());
    	user.setEmail(request.getEmail());
    	user.setPassword(passwordEncoder.encode(request.getPassword()));
    	user.setRole(Role.USER);
    	user.setCreatedAt(LocalDateTime.now());
    	userRepository.save(user);
    	return "User Registered Successfully";
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return new LoginResponse(token, user.getRole().name());
    }

}