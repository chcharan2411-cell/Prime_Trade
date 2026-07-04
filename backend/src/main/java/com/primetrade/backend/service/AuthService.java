package com.primetrade.backend.service;

import com.primetrade.backend.dto.LoginRequest;
import com.primetrade.backend.dto.LoginResponse;
import com.primetrade.backend.dto.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

}