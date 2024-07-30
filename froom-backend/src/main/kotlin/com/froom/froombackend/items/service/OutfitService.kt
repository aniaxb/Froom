package com.froom.froombackend.items.service

import com.froom.froombackend.exceptions.type.OutfitCreationException
import com.froom.froombackend.exceptions.type.OutfitNotFoundException
import com.froom.froombackend.items.model.command.CreateOutfitCommand
import com.froom.froombackend.items.model.command.UpdateOutfitCommand
import com.froom.froombackend.items.model.domain.BodyPart
import com.froom.froombackend.items.model.domain.Item
import com.froom.froombackend.items.model.domain.Outfit
import com.froom.froombackend.items.model.dto.ItemDto
import com.froom.froombackend.items.model.dto.OutfitDto
import com.froom.froombackend.items.repository.ItemRepository
import com.froom.froombackend.items.repository.OutfitRepository
import com.froom.froombackend.items.util.toDto
import com.froom.froombackend.user.model.domain.User
import jakarta.transaction.Transactional
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.*

@Service
class OutfitService(
    private val itemRepository: ItemRepository,
    private val outfitRepository: OutfitRepository
) {

    companion object {
        const val NOT_FOUND = "Outfit not found"
    }

    val logger: Logger = LoggerFactory.getLogger(this::class.java)

    @Transactional
    fun createOutfit(command: CreateOutfitCommand, toUser: User): OutfitDto {
        val items = command.itemUuids.mapNotNull { itemRepository.findByUuid(it) }
        val outfit = Outfit(
            id = null,
            name = command.name,
            user = toUser,
            items = items.toMutableList()
        )
        checkIfItemsInOutfitAreCorrect(items)
        logger.info("Outfit created: ${outfit.uuid}")
        return outfitRepository.save(outfit).toDto()
    }

    fun checkIfItemsInOutfitAreCorrect(items: List<Item>) {
        if (items.size < 2) {
            throw OutfitCreationException("Cannot create outfit with less than 2 items")
        }
        else if (items.size > 5) {
            throw OutfitCreationException("Cannot create outfit with more than 5 items")
        }
        val bodyParts = items.map { it.category.bodyPart }
        if (bodyParts.size != bodyParts.distinct().size) {
            throw OutfitCreationException("Cannot create outfit with duplicate body parts")
        }
    }

    @Transactional
    fun addItemToOutfit(outfitUuid: UUID, itemUuid: UUID, toUser: User): OutfitDto {
        val outfit = outfitRepository.findOutfitByUuid(outfitUuid) ?: throw Exception(NOT_FOUND)
        if (outfit.user.uuid != toUser.uuid) {
            throw OutfitNotFoundException("Cannot add item to outfit: $outfitUuid, user: ${toUser.uuid} does not own the outfit.")
        }
        if (outfit.items.size > 5) {
            throw OutfitNotFoundException("Cannot add more than 5 items to outfit")
        }
        val item = itemRepository.findByUuid(itemUuid) ?: throw Exception("Item not found")
        outfit.items.add(item)
        logger.info("Item added to outfit: $outfitUuid")
        return outfitRepository.save(outfit).toDto()
    }

    @Transactional
    fun getAllOutfits(user: User): List<OutfitDto> {
        return outfitRepository.findOutfitsByUserUuid(user.uuid).map { it.toDto() }
    }

    @Transactional
    fun getOutfitByUuid(uuid: UUID, user: User): OutfitDto {
        val outfit = outfitRepository.findOutfitByUuid(uuid) ?: throw Exception(NOT_FOUND)
        if (outfit.user.uuid != user.uuid) {
            throw OutfitNotFoundException("Cannot retrieve outfit: $uuid, user: ${user.uuid} does not own the outfit.")
        }
        return outfit.toDto()
    }

  @Transactional
  fun updateOutfit(command: UpdateOutfitCommand, uuid: UUID, user: User): OutfitDto {
      val outfit = outfitRepository.findOutfitByUuid(uuid) ?: throw Exception(NOT_FOUND)
      if (outfit.user.uuid != user.uuid) {
          throw OutfitNotFoundException("Cannot update outfit: $uuid, user: ${user.uuid} does not own the outfit.")
      }
      outfit.name = command.name
      outfit.items = command.items.mapNotNull { itemRepository.findByUuid(it) }.toMutableList()
      checkIfItemsInOutfitAreCorrect(outfit.items)
      logger.info("Outfit updated: $outfit")
      return outfitRepository.save(outfit).toDto()
    }

    @Transactional
    fun deleteOutfit(uuid: UUID, user: User) {
          val outfit = outfitRepository.findOutfitByUuid(uuid) ?: throw Exception(NOT_FOUND)
            if (outfit.user.uuid != user.uuid) {
                throw OutfitNotFoundException("Cannot delete outfit: $uuid, user: ${user.uuid} does not own the outfit.")
            }
            outfitRepository.delete(outfit)
            logger.info("Outfit deleted: $uuid")
    }

    @Transactional
    fun removeItemFromOutfit(outfitUuid: UUID, itemUuid: UUID, user: User): OutfitDto {
        val outfit = outfitRepository.findOutfitByUuid(outfitUuid) ?: throw Exception(NOT_FOUND)
        if (outfit.user.uuid != user.uuid) {
            throw OutfitNotFoundException("Cannot delete item from outfit: $outfitUuid, user: ${user.uuid} does not own the outfit.")
        }
        val item = itemRepository.findByUuid(itemUuid) ?: throw Exception("Item not found")
        outfit.items.remove(item)
        logger.info("Item deleted from outfit: $outfitUuid")
        return outfitRepository.save(outfit).toDto()
    }

    @Transactional
    fun getOutfitItems(outfitUuid: UUID): List<ItemDto> {
        return outfitRepository.findOutfitByUuid(outfitUuid)?.items?.map { it.toDto() } ?: emptyList()
    }

    @Transactional
    fun getOutfitByName(name: String, user: User): OutfitDto {
        val outfit = outfitRepository.findOutfitByName(name) ?: throw OutfitNotFoundException("No outfit found with name: $name")
        return outfit.toDto()
    }

    @Transactional
    fun duplicateOutfit(outfitUuid: UUID, user: User): OutfitDto {
        val outfit = outfitRepository.findOutfitByUuid(outfitUuid) ?: throw Exception(NOT_FOUND)
        if (outfit.user.uuid != user.uuid) {
            throw OutfitNotFoundException("Cannot duplicate outfit: $outfitUuid, user: ${user.uuid} does not own the outfit.")
        }
        val duplicateOutfit = Outfit(
            id = null,
            name = "Copy of ${outfit.name}",
            user = user,
            items = outfit.items.map { it }.toMutableList()
        )
        logger.info("Outfit duplicated: $outfitUuid")
        return outfitRepository.save(duplicateOutfit).toDto()
    }

    @Transactional
    fun generateRandomOutfit(user: User): OutfitDto {
        val items = itemRepository.findByUserUuid(user.uuid).map { it.toDto() }
        val bodyParts = BodyPart.entries.filter { it != BodyPart.UNKNOWN }.toTypedArray()

        val itemsByBodyPart = bodyParts.associateWith { bodyPart ->
            items.filter { it.category.bodyPart == bodyPart }
        }

        val missingBodyParts = itemsByBodyPart.filter { it.value.isEmpty() }.keys
        when {
            missingBodyParts.isNotEmpty() -> {
                throw OutfitCreationException("Not enough items to generate a random outfit for body parts: $missingBodyParts")
            }
            else -> {
                val randomItems = itemsByBodyPart.map { (_, items) ->
                    items.random()
                }

                val outfit = Outfit(
                    id = null,
                    name = "Random outfit",
                    user = user,
                    items = randomItems.map { itemRepository.findByUuid(it.uuid)!! }.toMutableList()
                )
                logger.info("Random outfit created: ${outfit.uuid}")
                return outfitRepository.save(outfit).toDto()
            }
        }
    }

    fun getSimilarItemsToBaseItemByColor(baseItem: Item, items: List<Item>): List<Item> {
        val itemByBodyPart = items.groupBy { it.category.bodyPart }
        val similarItems = mutableListOf<Item>()
        similarItems.add(baseItem)
        itemByBodyPart.filterKeys { it != baseItem.category.bodyPart }
        return similarItems
    }
}