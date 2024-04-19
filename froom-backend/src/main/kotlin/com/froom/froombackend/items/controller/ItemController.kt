package com.froom.froombackend.items.controller

import com.froom.froombackend.authorization.util.toUser
import com.froom.froombackend.items.model.command.UpdateItemCommand
import com.froom.froombackend.items.model.domain.BodyPart
import com.froom.froombackend.items.model.domain.Category
import com.froom.froombackend.items.model.dto.ItemDto
import com.froom.froombackend.items.service.ItemService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import java.util.*

@RestController
@RequestMapping("/item")
class ItemController (val itemService: ItemService) {

    @GetMapping()
    fun getAllItems(authentication: Authentication): ResponseEntity<List<ItemDto>> {
        return ResponseEntity<List<ItemDto>>(itemService.getAllItems(authentication.toUser()),
            HttpStatus.OK)
    }

    @GetMapping("/{uuid}")
    fun getItemByUuid(@PathVariable uuid: UUID, authentication: Authentication): ResponseEntity<ItemDto> {
        return ResponseEntity<ItemDto>(itemService.getItemByUuid(uuid, authentication.toUser()),
            HttpStatus.OK)
    }

    @PostMapping("/create")
    fun createItem(@RequestParam("image") file: MultipartFile, authentication: Authentication): ResponseEntity<ItemDto> {
        return ResponseEntity<ItemDto> (itemService.createItem(file, authentication.toUser()),
            HttpStatus.CREATED)
    }

    @PutMapping("/{uuid}")
    fun updateItem(@RequestBody @Valid command: UpdateItemCommand, @PathVariable uuid: UUID, authentication: Authentication): ResponseEntity<ItemDto> {
        return ResponseEntity<ItemDto>(itemService.updateItem(command, uuid, authentication.toUser()),
            HttpStatus.OK)
    }

    @PutMapping("/{uuid}/image")
    fun updateItemImage(@RequestParam("image") file: MultipartFile, @PathVariable uuid: UUID, authentication: Authentication): ResponseEntity<ItemDto> {
        return ResponseEntity<ItemDto>(itemService.updateItemImage(file, uuid, authentication.toUser()),
            HttpStatus.OK)
    }

    @DeleteMapping("/{uuid}")
    fun deleteItem(@PathVariable uuid: UUID, authentication: Authentication): ResponseEntity<HttpStatus> {
        itemService.deleteItem(uuid, authentication.toUser())
        return ResponseEntity<HttpStatus>(HttpStatus.ACCEPTED)
    }

    @GetMapping("/filter")
    fun getItemsByFilter(
        @RequestParam(required = false) category: Category?,
        @RequestParam(required = false) bodyPart: BodyPart?,
        @RequestParam(required = false) color: List<String>?,
        authentication: Authentication
    ): ResponseEntity<List<ItemDto>> {
        return ResponseEntity<List<ItemDto>>(itemService.getItemsByFilter(category, bodyPart, color, authentication.toUser()),
            HttpStatus.OK)

    }

}