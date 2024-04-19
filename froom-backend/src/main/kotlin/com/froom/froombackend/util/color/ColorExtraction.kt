package com.froom.froombackend.util.color

import org.springframework.stereotype.Component
import org.springframework.web.multipart.MultipartFile

@Component
class ColorExtraction {
    fun getColor(file: MultipartFile): List<Int> {
        println("Color extracted")
        return listOf("#FF0000", "#00FF00", "#0000FF").map { it.substring(1).toInt(16) }
    }
}