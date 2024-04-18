package com.froom.froombackend.util.category

import com.froom.froombackend.items.model.domain.Category
import org.springframework.stereotype.Component
import org.springframework.web.multipart.MultipartFile

@Component
class CategoryPrediction {

    fun getCategory(file: MultipartFile): Category {
        println("Category extracted")
        return Category.BAG
    }
}