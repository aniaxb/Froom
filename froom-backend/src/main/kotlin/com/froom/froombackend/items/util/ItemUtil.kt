package com.froom.froombackend.items.util

import com.froom.froombackend.items.model.domain.Item
import com.froom.froombackend.items.model.dto.ItemDto
import java.util.*

fun Item.toDto(): ItemDto {
    val base64Image: String = Base64.getEncoder().encodeToString(this.image)
    return ItemDto(
        uuid = this.uuid,
        category = this.category,
        bodyPart = this.bodyPart,
        color = this.color,
        image = base64Image,
        imageFormat = this.imageFormat
    )
}