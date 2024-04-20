package com.froom.froombackend.authorization.model.command

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull

data class LoginAuthCommand (
    @field:NotBlank(message = "Email is required")
    @NotNull
    val email: String,
    @field:NotBlank(message = "Password is required")
    @NotNull
    val password: String
)