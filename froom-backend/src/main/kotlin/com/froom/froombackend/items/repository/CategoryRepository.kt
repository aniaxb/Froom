package com.froom.froombackend.items.repository

import com.froom.froombackend.items.model.domain.BodyPart
import com.froom.froombackend.items.model.domain.Category

interface CategoryRepository {
    fun getCategories(): List<Category>
    fun getBodyParts(): List<BodyPart>
    fun getCategoriesByBodyPart(bodyPart: BodyPart): List<Category>
}