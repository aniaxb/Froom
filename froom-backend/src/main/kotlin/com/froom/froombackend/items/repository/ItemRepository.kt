package com.froom.froombackend.items.repository

import com.froom.froombackend.items.model.domain.BodyPart
import com.froom.froombackend.items.model.domain.Category
import com.froom.froombackend.items.model.domain.Item
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ItemRepository: JpaRepository<Item, Int> {
    fun findByUuid(uuid: UUID): Item?

    fun findByUserUuid(userUuid: UUID): List<Item>

    fun findByCategoryAndUserUuid(category: Category?, userUuid: UUID): List<Item>

    fun findByBodyPartAndUserUuid(bodyPart: BodyPart?, userUuid: UUID): List<Item>

    fun findByColorAndUserUuid(color: String?, userUuid: UUID): List<Item>
}