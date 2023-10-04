package com.froom.backend.user.controller;

import com.froom.backend.authorization.model.command.RegisterUserCommand;
import com.froom.backend.user.model.domain.User;
import com.froom.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;

//    @PostMapping("/register")
//    public void registerUser(@RequestBody @Validated RegisterUserCommand command) {
//        if (userRepository.findByEmail(command.getEmail()).isPresent()) {
//            throw new IllegalArgumentException("Email is already registered");
//        }
//
//        // Create a new User entity and set its properties
//        User user = new User();
//        user.setFirstName(command.getFirstName());
//        user.setLastName(command.getLastName());
//        user.setEmail(command.getEmail());
//        user.setPassword(passwordEncoder.encode(command.getPassword()));
//
//        // Save the user to the database
//        userRepository.save(user);
//    }

    @GetMapping("/me")
    public void getMyself() {

    }

    @GetMapping("/users")
    public Iterable<User> getAllUsers() {
//        return userRepository.findAll();
        List<User> users = userRepository.findAll();
        System.out.println("Users: " + users); // Log the users
        return users;
    }

    @PutMapping
    public void updateUser() {

    }

    @DeleteMapping
    public void deleteUser() {

    }
}
