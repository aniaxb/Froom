package com.froom.froombackend.items.model.command

import com.froom.froombackend.items.model.domain.BodyPart
import com.froom.froombackend.items.model.domain.Category
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size

data class UpdateItemCommand(
    @field:NotNull(message = "Category is required")
    val category: Category,
    @field:NotNull(message = "Bodypart is required")
    val bodypart: BodyPart,
    @field:Size(min = 1, max=3, message = "Color is required")
    val color: List<String>
)
