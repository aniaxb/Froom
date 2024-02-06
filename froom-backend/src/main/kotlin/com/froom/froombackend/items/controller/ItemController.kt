package com.froom.froombackend.items.controller

import com.froom.froombackend.items.model.dto.ItemDto
import com.froom.froombackend.items.service.ItemService
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import java.util.*

@RestController
@RequestMapping("/item")
class ItemController (val itemService: ItemService){

        @GetMapping()
        fun getItems() {

        }

    @GetMapping("/{uuid}")
    fun getItemByUuid(@PathVariable uuid: UUID) {

    }

    @PostMapping()
    fun createItem(@RequestParam("image") file: MultipartFile, authentication: Authentication): ResponseEntity<ItemDto> {
        return ResponseEntity.ok().build()

    }

    @PutMapping("/{uuid}")
    fun updateItem(@PathVariable uuid: String) {

    }

    @DeleteMapping("/{uuid}")
    fun deleteItem(@PathVariable uuid: String) {
    }

    @GetMapping("/filter")
    fun getItemsByFilter(
        @RequestParam(required = false) category: String?,
        @RequestParam(required = false) bodyPart: String?,
    ) {

    }


}