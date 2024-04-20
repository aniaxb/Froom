package com.froom.froombackend.authorization.model.dto

import com.froom.froombackend.user.model.dto.UserDto

data class TokenDto(
    val user: UserDto,
    val accessToken: String,
    var refreshToken: String,
    val expiresIn: Long,
    val unit: String,
    val tokenType: String,
)
