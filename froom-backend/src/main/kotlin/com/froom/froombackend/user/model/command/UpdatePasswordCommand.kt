package com.froom.froombackend.user.model.command

import jakarta.validation.constraints.NotBlank

data class UpdatePasswordCommand(
    @field:NotBlank(message = "Old password is required")
    val oldPassword: String,
    @field:NotBlank(message = "New password is required")
    val newPassword: String,
    @field:NotBlank(message = "New password confirmation is required")
    val newPasswordConfirmation: String
)
