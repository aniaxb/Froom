package com.froom.froombackend.user.model.dto

import java.util.*

data class UserDto(
    val uuid: UUID,
    val firstName: String,
    val lastName: String,
    val email: String,
    val username: String,
)