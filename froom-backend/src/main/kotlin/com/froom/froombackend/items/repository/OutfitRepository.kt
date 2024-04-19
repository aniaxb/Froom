package com.froom.froombackend.items.repository

import com.froom.froombackend.items.model.domain.Outfit
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface OutfitRepository: JpaRepository<Outfit, Int> {

    fun findOutfitsByUserUuid(userUuid: UUID): List<Outfit>

    fun findOutfitByUuid(uuid: UUID): Outfit?

    fun findOutfitByName(name: String): Outfit?
}