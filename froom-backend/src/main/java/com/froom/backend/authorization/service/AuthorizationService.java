package com.froom.backend.authorization.service;

import com.froom.backend.authorization.model.domain.Token;
import com.froom.backend.user.model.dto.UserDto;
import com.froom.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthorizationService {

    private final JwtTokenService jwtTokenService;
    private final UserService userService;

    public Token generateToken(String email, String password) throws Exception {
        Optional<UserDetails> user = Optional.ofNullable(userService.loadUserByEmail(email));
        if (user.isEmpty() || !password.matches(password)) {
            throw new Exception("Invalid credentials");
        }

        return jwtTokenService.generateToken(email, (UserDto) user.get());
    }

}
