package com.froom.backend.authorization.controller;

import com.froom.backend.authorization.model.command.AuthorizationCommand;
import com.froom.backend.authorization.model.command.RegisterUserCommand;
import com.froom.backend.authorization.model.domain.Token;
import com.froom.backend.authorization.model.dto.AuthorizationDto;
import com.froom.backend.authorization.service.AuthorizationService;
import com.froom.backend.authorization.service.JwtTokenService;
import com.froom.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("auth")
@RequiredArgsConstructor
public class AuthorizationController {

    private final AuthorizationService tokenService;
    private final UserService userService;

    @PostMapping("/login")
    public Token login(@RequestBody String email, @RequestBody String password) throws Exception {
        return tokenService.generateToken(email, password);
    }

    @PostMapping("/refreshToken")
    public AuthorizationDto refreshToken() {
        return new AuthorizationDto("new_token", null, null);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterUserCommand command) {
        try {
            userService.registerUser(command);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: " + e.getMessage());
        }
    }
}
