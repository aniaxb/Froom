package com.froom.froombackend.items.model.command

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import java.util.*

data class CreateOutfitCommand(
    @field:NotBlank(message = "Name is required")
    val name: String,
    @field:Size(min = 1, message = "At least one item is required")
    val itemUuids: List<UUID>
)
