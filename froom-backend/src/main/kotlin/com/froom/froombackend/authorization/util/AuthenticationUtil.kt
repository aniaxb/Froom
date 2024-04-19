package com.froom.froombackend.authorization.util

import com.froom.froombackend.user.model.domain.User
import org.springframework.security.core.Authentication

fun Authentication.toUser(): User {
    return this.principal as User
}