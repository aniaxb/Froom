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
import kotlinx.coroutines.*
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.util.*


@Service
class ItemService (
    val itemRepository: ItemRepository,
    val categoryPrediction: CategoryPrediction,
    val colorExtraction: ColorExtraction,
) {
    val NOT_FOUND: String = "Item not found"

    val logger: Logger = LoggerFactory.getLogger(this::class.java)

    @Transactional
    fun getAllItems(user: User): List<ItemDto> {
        logger.info("User items retrieved: ${user.username}")
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
            val colorDeferred: Deferred<Pair<List<String>, ByteArray>> = CoroutineScope(Dispatchers.Default).async { getColor(file) }

            val category = runBlocking { categoryDeferred.await() }

            val (color, image) = runBlocking {
                colorDeferred.await()
            }

            val item = Item (
                id = null,
                user = user,
                category = category,
                color = color,
                bodyPart = category.bodyPart,
                image = image,
                imageFormat = file.contentType!!
            )

            logger.info("Item created: $item")
            itemRepository.save(item).toDto()

        } catch (e: Exception) {
            throw Exception("Error creating item: ${e.message}")
        }
    }

    @Transactional
    fun createItemWithoutDataAnalysis(file: MultipartFile, user: User): ItemDto {
        val category = Category.UNKNOWN
        val color = listOf("unknown")
        val item = Item (
            id = null,
            user = user,
            category = category,
            color = color,
            bodyPart = category.bodyPart,
            image = file.bytes,
            imageFormat = file.contentType!!
        )
        logger.info("Item created: $item")
        return itemRepository.save(item).toDto()
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
        item.bodyPart = command.bodyPart
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
    fun getItemsByFilter(category: Category?, bodyPart: BodyPart?, color: String?, user: User): List<ItemDto> {
        var filteredItems = itemRepository.findByUserUuid(user.uuid)

        category?.let {
            filteredItems = filteredItems.filter { it.category == category }
        }

        bodyPart?.let {
            filteredItems = filteredItems.filter { it.bodyPart == bodyPart }
        }

        color?.let {
            filteredItems = filteredItems.filter { it.color.contains(color) }
        }

        return filteredItems.map { it.toDto() }
    }


    fun getColor(file: MultipartFile): Pair<List<String>, ByteArray> {
        return colorExtraction.getColor(file)
    }

    fun getCategory(file: MultipartFile): Category {
        return categoryPrediction.getCategory(file)
    }
}