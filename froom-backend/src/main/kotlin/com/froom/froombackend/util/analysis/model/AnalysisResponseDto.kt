package com.froom.froombackend.util.analysis.model

import com.froom.froombackend.items.model.domain.Category

data class AnalysisResponseDto(
    val predictedCategory: Category,
    val confidence: Double,
    val colors: List<String>,
    val image: ByteArray,
)
