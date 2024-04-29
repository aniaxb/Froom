package com.froom.froombackend.util.category.model

data class CategoryResponseDto(
    val category: String,
    val confidence: Double
) {
    constructor() : this("", 0.0)
}
