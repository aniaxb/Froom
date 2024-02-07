package com.froom.froombackend.util.color

import org.springframework.web.bind.annotation.PostMapping

interface ColorExtractionAPI {

    @PostMapping("/extractColor")
    fun extractColor(): String

}