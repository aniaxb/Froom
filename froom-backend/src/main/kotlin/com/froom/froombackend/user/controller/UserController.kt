package com.froom.froombackend.user.controller

import com.froom.froombackend.user.model.command.RegisterUserCommand
import com.froom.froombackend.user.service.UserService
import jakarta.validation.Valid
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/user")
class UserController (private val userService: UserService)  {

    @GetMapping()
    fun getUser(authentication: Authentication) {

    }

    @PostMapping("/register")
    fun registerUser(@RequestBody @Valid command: RegisterUserCommand) {

    }

    @PutMapping()
    fun updateUser(){

    }

    @DeleteMapping()
    fun deleteUser(){

    }

}