package com.froom.froombackend.authorization.service

import com.froom.froombackend.authorization.model.command.LoginAuthCommand
import com.froom.froombackend.authorization.model.command.RefreshAuthCommand
import com.froom.froombackend.authorization.model.dto.TokenDto
import com.froom.froombackend.exceptions.type.InvalidCredentialsException
import com.froom.froombackend.user.model.domain.User
import com.froom.froombackend.user.service.UserService
import org.springframework.stereotype.Service

@Service
class AuthorizationService(
    private val tokenService: TokenService,
    private val hashService: HashService,
    private val userService: UserService
) {

    fun login(command: LoginAuthCommand): TokenDto {
        val user = userService.findByEmail(command.email)
        if (user == null || !hashService.checkBcrypt(command.password, user.password)) {
            throw InvalidCredentialsException("Invalid credentials")
        }
        return tokenService.generateToken(user)
    }

    fun refreshToken(command: RefreshAuthCommand): TokenDto {
        val user = getUserFromRefreshToken(command.refreshToken)
        return generateTokenForUser(user, command.refreshToken)
    }

    private fun getUserFromRefreshToken(refreshToken: String): User {
        return tokenService.checkRefreshTokenAndReturnUser(refreshToken)
    }

    private fun generateTokenForUser(user: User, refreshToken: String): TokenDto {
        val token = tokenService.generateToken(user)
        token.refreshToken = refreshToken
        return token
    }
}