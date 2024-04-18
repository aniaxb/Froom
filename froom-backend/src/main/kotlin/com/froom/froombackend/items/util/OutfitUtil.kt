package com.froom.froombackend.items.util

import com.froom.froombackend.items.model.domain.Outfit
import com.froom.froombackend.items.model.dto.OutfitDto

fun Outfit.toDto(): OutfitDto {
    return OutfitDto(
        uuid = this.uuid,
        name = this.name,
        items = this.items.map { it.toDto() }
    )
}