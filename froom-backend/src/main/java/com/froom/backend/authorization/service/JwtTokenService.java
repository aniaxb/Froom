package com.froom.backend.authorization.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.froom.backend.authorization.model.domain.Token;
import com.froom.backend.user.model.dto.UserDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenService {

    @Value("${spring.security.jwt.secret}")
    private String secret;

    @Value("${spring.security.jwt.expiration}")
    private long expirationTime;

    @Value("${spring.security.jwt.refresh-expiration}")
    private long refreshExpirationTime;

    public Token generateToken(String email, UserDto userDto) {
        return Token.builder()
                .token(createToken(email,
                        new Date(System.currentTimeMillis() + getExpirationTime())))
                .refreshToken(createToken(email,
                        new Date(System.currentTimeMillis() + getRefreshExpirationTime())))
                .userDto(userDto)
                .build();
    }

    private String createToken(String email, Date date) {
        return JWT.create()
                .withSubject(email)
                .withExpiresAt(date)
                .sign(Algorithm.HMAC512(getSecret().getBytes()));
    }

    public String getSecret() {
        return secret;
    }

    public long getExpirationTime() {
        return expirationTime;
    }

    public long getRefreshExpirationTime() {
        return refreshExpirationTime;
    }
}
