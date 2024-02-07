package com.froom.froombackend.items.service

import com.froom.froombackend.items.model.domain.BodyPart
import com.froom.froombackend.items.model.domain.Category
import com.froom.froombackend.items.model.dto.ItemDto
import com.froom.froombackend.items.repository.ItemRepository
import com.froom.froombackend.user.model.domain.User
import com.froom.froombackend.util.category.CategoryPrediction
import com.froom.froombackend.util.color.ColorExtraction
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.util.UUID

@Service
class ItemService (
    val itemRepository: ItemRepository,
    val categoryPrediction: CategoryPrediction,
    val colorExtraction: ColorExtraction,
) {
    fun getItems() {
        itemRepository.findAll()
    }

    fun getItemByUuid(uuid: UUID) {
        itemRepository.findByUuid(uuid)
    }

    fun createItem(file: MultipartFile, user: User): ItemDto {
        println(categoryPrediction.getCategory())
        println(colorExtraction.getColor())

        return Any() as ItemDto
    }

    fun deleteItem(uuid: UUID) {
        itemRepository.deleteByUuid(uuid)
    }

    fun getItemsByFilter(category: Category, bodyPart: BodyPart, color: String) {
        itemRepository.findByFilter(category, bodyPart, color)
    }

}