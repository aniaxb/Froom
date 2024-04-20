package com.froom.froombackend.user.util

import com.froom.froombackend.user.model.domain.User
import com.froom.froombackend.user.model.dto.UserDto

fun User.toDto(): UserDto {
    return UserDto(
        uuid = this.uuid,
        firstName = this.firstName,
        lastName = this.lastName,
        email = this.email,
        username = this.username,
    )
}