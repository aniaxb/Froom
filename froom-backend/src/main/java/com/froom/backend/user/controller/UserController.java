package com.froom.backend.user.controller;

import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController("user")
public class UserController {

    @PostMapping("/register")
    public void register() {

    }

    @GetMapping("/me")
    public void getMyself() {

    }

    @PutMapping
    public void updateUser() {

    }

    @DeleteMapping
    public void deleteUser() {

    }
}
