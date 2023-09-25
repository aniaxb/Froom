package com.froom.backend.authorization.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("auth")
public class AuthorizationController {
    @PostMapping("/login")
    public void login() {

    }

    @PostMapping("/refreshToken")
    public void refreshToken() {

    }
}
