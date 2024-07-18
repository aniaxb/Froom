package com.froom.froombackend.items.service

import com.froom.froombackend.items.model.domain.BodyPart
import com.froom.froombackend.items.model.domain.Category
import org.springframework.stereotype.Service

@Service
class CategoryService {

    fun getCategories(): List<Category> {
        return Category.entries
    }

    fun getBodyParts(): List<BodyPart> {
        return BodyPart.entries
    }

    fun getCategoriesByBodyPart(bodyPart: BodyPart): List<Category> {
        return Category.entries.filter { it.bodyPart == bodyPart }
    }
}