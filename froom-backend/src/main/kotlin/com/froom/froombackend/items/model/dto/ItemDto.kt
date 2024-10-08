package com.froom.froombackend.items.model.dto

import com.froom.froombackend.items.model.domain.BodyPart
import com.froom.froombackend.items.model.domain.Category
import java.util.*

data class ItemDto(
    val uuid: UUID,
    val category: Category,
    val bodyPart: BodyPart,
    val color: List<String>,
    val image: String,
    val imageFormat: String
)