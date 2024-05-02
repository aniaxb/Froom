package com.froom.froombackend.util.color.model

data class ColorResponseDto(
    val colors: List<String>,
    val image: ByteArray
) {
    constructor() : this(emptyList(), ByteArray(0))
}
