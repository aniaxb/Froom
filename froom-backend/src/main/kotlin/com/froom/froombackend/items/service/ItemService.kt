package com.froom.froombackend.items.service

import com.froom.froombackend.items.model.command.UpdateItemCommand
import com.froom.froombackend.items.model.domain.BodyPart
import com.froom.froombackend.items.model.domain.Category
import com.froom.froombackend.items.model.domain.Item
import com.froom.froombackend.items.model.dto.ItemDto
import com.froom.froombackend.items.repository.ItemRepository
import com.froom.froombackend.items.util.toDto
import com.froom.froombackend.user.model.domain.User
import com.froom.froombackend.util.category.CategoryPrediction
import com.froom.froombackend.util.color.ColorExtraction
import jakarta.transaction.Transactional
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.util.UUID
import kotlinx.coroutines.*


@Service
class ItemService (
    val itemRepository: ItemRepository,
    val categoryPrediction: CategoryPrediction,
    val colorExtraction: ColorExtraction,
) {
    val NOT_FOUND: String = "Item not found"

    val logger: Logger = LoggerFactory.getLogger(this::class.java)

    fun getAllItems(user: User): List<ItemDto> {
        logger.info("User items retrieved: ${user.userName}")
        itemRepository.findByUserUuid(user.uuid).let {
            return it.map { item -> item.toDto() }
        }
    }

    @Transactional
    fun getItemByUuid(uuid: UUID, user: User): ItemDto {
        logger.info("Item retrieved: $uuid")
        val item = itemRepository.findByUuid(uuid) ?: throw Exception(NOT_FOUND)
        if (item.user.uuid != user.uuid) {
            throw Exception("Cannot retrieve item: $uuid, user: ${user.uuid} does not own the item.")
        }
        return item.toDto()
    }

    @Transactional
    fun createItem(file: MultipartFile, user: User): ItemDto {
        return try {
            val categoryDeferred: Deferred<Category> = CoroutineScope(Dispatchers.Default).async { getCategory(file) }
            val colorDeferred: Deferred<List<Int>> = CoroutineScope(Dispatchers.Default).async { getColor(file) }

            val (category, color) = runBlocking {
                awaitAll(categoryDeferred, colorDeferred)
            }

            val item = Item (
                id = null,
                user = user,
                category = category as Category,
                color = color as List<String>,
                bodyPart = BodyPart.TOP,
                image = file.bytes,
                imageFormat = file.contentType!!
            )

            logger.info("Item created: $item")
            itemRepository.save(item).toDto()

        } catch (e: Exception) {
            throw Exception("Error creating item: ${e.message}")
        }
    }

    @Transactional
    fun deleteItem(uuid: UUID, user: User) {
        val item = itemRepository.findByUuid(uuid) ?: throw Exception(NOT_FOUND)
        if (item.user.uuid != user.uuid) {
            throw Exception("Cannot delete item: $uuid, user: ${user.uuid} does not own the item.")
        }
        itemRepository.delete(item)
        logger.info("Item deleted: $uuid")
    }

    @Transactional
    fun updateItem(command: UpdateItemCommand, uuid: UUID, user: User): ItemDto {
        val item = itemRepository.findByUuid(uuid) ?: throw Exception(NOT_FOUND)
        if (item.user.uuid != user.uuid) {
            throw Exception("Cannot update item: $uuid, user: ${user.uuid} does not own the item.")
        }
        item.category = command.category
        item.bodyPart = command.bodypart
        item.color = command.color
        logger.info("Item updated: $uuid")
        return itemRepository.save(item).toDto()
    }

    @Transactional
    fun updateItemImage(file: MultipartFile, uuid: UUID, user: User): ItemDto {
        val item = itemRepository.findByUuid(uuid) ?: throw Exception(NOT_FOUND)
        if (item.user.uuid != user.uuid) {
            throw Exception("Cannot update item: $uuid, user: ${user.uuid} does not own the item.")
        }
        item.image = file.bytes
        item.imageFormat = file.contentType!!
        logger.info("Item image updated: $uuid")
        return itemRepository.save(item).toDto()
    }

    @Transactional
    fun getItemsByFilter(category: Category?, bodyPart: BodyPart?, color: List<String>?, user: User): List<ItemDto> {
        val items = itemRepository.findItemsByFilter(category, bodyPart, color, user)
        return items.map { item -> item.toDto() }
    }

    fun getColor(file: MultipartFile): List<Int> {
        return colorExtraction.getColor(file)
    }

    fun getCategory(file: MultipartFile): Category {
        return categoryPrediction.getCategory(file)
    }
}