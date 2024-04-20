package com.froom.froombackend.authorization.controller

import com.froom.froombackend.authorization.model.command.LoginAuthCommand
import com.froom.froombackend.authorization.model.command.RefreshAuthCommand
import com.froom.froombackend.authorization.model.dto.TokenDto
import com.froom.froombackend.authorization.service.AuthorizationService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/auth")
class AuthorizationController (
    private val authorizationService: AuthorizationService
) {

    @PostMapping("/login")
    fun login(@RequestBody @Valid command: LoginAuthCommand): ResponseEntity<TokenDto> {
        return ResponseEntity<TokenDto>(authorizationService.login(command),
            HttpStatus.ACCEPTED)
    }

    @PostMapping("/refresh")
    fun refresh(@RequestBody @Valid command: RefreshAuthCommand): ResponseEntity<TokenDto> {
        return ResponseEntity<TokenDto>(authorizationService.refreshToken(command),
            HttpStatus.ACCEPTED)
    }
}