package com.froom.backend.user.service;

import com.froom.backend.authorization.model.command.RegisterUserCommand;
import com.froom.backend.user.model.domain.User;
import com.froom.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        return (UserDetails) userRepository.findByEmail(email).orElseThrow(
                () -> new Error("User not found")
        );
    }

    public void registerUser(RegisterUserCommand command) {
        // Check if the user with the same email already exists
        if (userRepository.findByEmail(command.email()).isPresent()) {
            throw new IllegalArgumentException("Email is already registered");
        }

        // Create a new User entity and set its properties
        User user = new User();
        user.setFirstName(command.firstName());
        user.setLastName(command.lastName());
        user.setEmail(command.email());
        user.setPassword(passwordEncoder.encode(command.password()));

        // Save the user to the database
        userRepository.save(user);
    }
}
