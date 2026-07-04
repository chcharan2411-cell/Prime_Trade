package com.primetrade.backend.config;

import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.primetrade.backend.entity.Role;
import com.primetrade.backend.entity.User;
import com.primetrade.backend.repository.UserRepository;

/**
 * Creates a default ADMIN account on first startup so you have a way to
 * test admin-only endpoints (there is no public "become admin" API on
 * purpose — that would be a security hole).
 *
 * Login with: admin@primetrade.com / Admin@123
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        String adminEmail = "admin@primetrade.com";

        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setRole(Role.ADMIN);
            admin.setCreatedAt(LocalDateTime.now());
            userRepository.save(admin);
            System.out.println(">>> Seeded default admin: " + adminEmail + " / Admin@123");
        }
    }
}