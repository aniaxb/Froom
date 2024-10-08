package com.froom.froombackend.user.model.command

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull

data class RegisterUserCommand (
    @field:NotBlank(message = "First name is required")
    @field:NotNull
    val firstName: String,
    @field:NotBlank(message = "Last name is required")
    @field:NotNull
    val lastName: String,
    @field:NotBlank(message = "Email is required")
    @field:NotNull
    val email: String,
    @field:NotBlank(message = "Username is required")
    @field:NotNull
    val username: String,
    @field:NotBlank(message = "Password is required")
    @field:NotNull
    val password: String
)