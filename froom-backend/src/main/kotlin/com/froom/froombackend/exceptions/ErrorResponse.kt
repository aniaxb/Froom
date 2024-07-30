package com.froom.froombackend.exceptions

data class ErrorResponse(
    val message: String,
    val status: Int,
    val errors: Map<String, String>?
)
