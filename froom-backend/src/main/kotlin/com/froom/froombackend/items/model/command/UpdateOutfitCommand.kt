package com.froom.froombackend.items.model.command

import jakarta.validation.constraints.NotBlank
import java.util.*

data class UpdateOutfitCommand(
    @field:NotBlank(message = "Name is required")
    val name: String,
    val items: List<UUID>
)
