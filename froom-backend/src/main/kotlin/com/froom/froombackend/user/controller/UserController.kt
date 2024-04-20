package com.froom.froombackend.user.controller

import com.froom.froombackend.authorization.util.toUser
import com.froom.froombackend.user.model.command.RegisterUserCommand
import com.froom.froombackend.user.model.command.UpdatePasswordCommand
import com.froom.froombackend.user.model.command.UpdateUserCommand
import com.froom.froombackend.user.model.dto.UserDto
import com.froom.froombackend.user.service.UserService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/user")
class UserController (
    private val userService: UserService
)  {

    @GetMapping()
    fun getUser(authentication: Authentication): ResponseEntity<UserDto> {
        return ResponseEntity.ok(userService.getUser(authentication.toUser()))
    }

    @PostMapping("/register")
    fun registerUser(@RequestBody @Valid command: RegisterUserCommand): ResponseEntity<UserDto> {
        return ResponseEntity(userService.registerUser(command), HttpStatus.CREATED)
    }

    @PutMapping()
    fun updateUser(@RequestBody @Valid command: UpdateUserCommand, authentication: Authentication): ResponseEntity<UserDto> {
        return ResponseEntity(userService.updateUser(command, authentication.toUser()), HttpStatus.ACCEPTED)
    }

    @PutMapping("/password")
    fun updatePassword(@RequestBody @Valid command: UpdatePasswordCommand, authentication: Authentication): ResponseEntity<UserDto> {
        return ResponseEntity(userService.updatePassword(command, authentication.toUser()), HttpStatus.ACCEPTED)
    }

    @DeleteMapping()
    fun deleteUser(authentication: Authentication): ResponseEntity<UserDto> {
        return ResponseEntity(userService.removeUser(authentication.toUser()), HttpStatus.OK)
    }

}