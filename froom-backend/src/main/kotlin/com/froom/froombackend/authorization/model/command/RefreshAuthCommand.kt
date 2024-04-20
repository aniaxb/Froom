package com.froom.froombackend.authorization.model.command

import jakarta.validation.constraints.NotBlank

data class RefreshAuthCommand (
    @field:NotBlank(message = "Refresh token is required")
    val refreshToken: String
)