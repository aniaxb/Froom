package com.froom.froombackend.items.model.dto

import java.util.*

data class OutfitDto(
    val uuid: UUID,
    val name: String,
    val items: List<ItemDto>,
)
