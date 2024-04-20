package com.froom.froombackend.items.repository

import com.froom.froombackend.items.model.domain.BodyPart
import com.froom.froombackend.items.model.domain.Category
import com.froom.froombackend.items.model.domain.Item
import com.froom.froombackend.user.model.domain.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ItemRepository: JpaRepository<Item, Int> {
    fun findByUuid(uuid: UUID): Item?

    fun findByUserUuid(userUuid: UUID): List<Item>

    fun findItemsByCategoryAndBodyPartAndColorInAndUser(
        category: Category?,
        bodyPart: BodyPart?,
        color: List<String>?,
        user: User
    ): List<Item>
}