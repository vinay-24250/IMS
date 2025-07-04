package com.IMS.Backend.Service;

import com.IMS.Backend.Model.Users;
import com.IMS.Backend.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    // Register new user
    public Users registerUser(Users user) {
        Optional<Users> existingUser = repo.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already registered.");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    // Get all users
    public List<Users> getAllUsers() {
        return repo.findAll();
    }

    // Authenticate and generate JWT
    public String verify(Users user) {
        Optional<Users> optionalUser = repo.findByEmail(user.getEmail());
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found.");
        }

        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(user.getEmail());
        }

        throw new RuntimeException("Authentication failed.");
    }
}
