package com.froom.froombackend.items.repository

import com.froom.froombackend.items.model.domain.BodyPart
import com.froom.froombackend.items.model.domain.Category
import com.froom.froombackend.items.model.domain.Item
import com.froom.froombackend.items.model.dto.ItemDto
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ItemRepository: JpaRepository<Item, Int> {
    fun findByUuid(uuid: UUID): Item?

    fun findByFilter(category: Category, bodyPart: BodyPart, color: String): List<ItemDto>

    fun deleteByUuid(uuid: UUID)
}