package com.froom.froombackend.user.model.command

import jakarta.validation.constraints.NotBlank

data class UpdateUserCommand(
    @field:NotBlank(message = "First name is required")
    val firstName: String,
    @field:NotBlank(message = "Last name is required")
    val lastName: String,
    @field:NotBlank(message = "Email name is required")
    val email: String,
    @field:NotBlank(message = "Username is required")
    val username: String,
)
