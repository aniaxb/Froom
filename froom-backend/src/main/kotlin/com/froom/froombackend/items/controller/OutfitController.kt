package com.froom.froombackend.items.controller

import com.froom.froombackend.authorization.util.toUser
import com.froom.froombackend.items.model.command.CreateOutfitCommand
import com.froom.froombackend.items.model.command.UpdateOutfitCommand
import com.froom.froombackend.items.model.dto.OutfitDto
import com.froom.froombackend.items.service.OutfitService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import java.util.UUID

@RestController
@RequestMapping("/outfit")
class OutfitController(val outfitService: OutfitService) {

    @PostMapping()
    fun createOutfit(@RequestBody @Valid command: CreateOutfitCommand, authentication: Authentication): ResponseEntity<OutfitDto> {
        return ResponseEntity<OutfitDto>(outfitService.createOutfit(command, authentication.toUser()),
            HttpStatus.CREATED)
    }

    @PutMapping("/{outfitUuid}/item/{itemUuid}")
    fun addItemToOutfit(
        @PathVariable outfitUuid: UUID,
        @PathVariable itemUuid: UUID,
        authentication: Authentication
    ): ResponseEntity<OutfitDto> {
        return ResponseEntity<OutfitDto>(outfitService.addItemToOutfit(outfitUuid, itemUuid, authentication.toUser()),
            HttpStatus.ACCEPTED)
    }

    @DeleteMapping("/{outfitUuid}/item/{itemUuid}")
    fun removeItemFromOutfit(
        @PathVariable outfitUuid: UUID,
        @PathVariable itemUuid: UUID,
        authentication: Authentication
    ): ResponseEntity<OutfitDto> {
        return ResponseEntity<OutfitDto>(outfitService.removeItemFromOutfit(outfitUuid, itemUuid, authentication.toUser()),
            HttpStatus.OK)
    }

    @GetMapping("/{outfitUuid}")
    fun getOutfitByUuid(
        @PathVariable outfitUuid: UUID,
        authentication: Authentication
    ): ResponseEntity<OutfitDto> {
        return ResponseEntity<OutfitDto>(outfitService.getOutfitByUuid(outfitUuid, authentication.toUser()),
            HttpStatus.OK)
    }

    @GetMapping()
    fun getAllOutfits(authentication: Authentication): ResponseEntity<List<OutfitDto>> {
        return ResponseEntity<List<OutfitDto>>(outfitService.getAllOutfits(authentication.toUser()),
            HttpStatus.OK)
    }

    @PutMapping("/{outfitUuid}")
    fun updateOutfit(
        @RequestBody @Valid command: UpdateOutfitCommand,
        @PathVariable outfitUuid: UUID,
        authentication: Authentication
    ): ResponseEntity<OutfitDto> {
        return ResponseEntity<OutfitDto>(outfitService.updateOutfit(command, outfitUuid, authentication.toUser()),
            HttpStatus.ACCEPTED)
    }

    @DeleteMapping("/{outfitUuid}")
    fun deleteOutfit(
        @PathVariable outfitUuid: UUID,
        authentication: Authentication
    ): ResponseEntity<HttpStatus> {
        outfitService.deleteOutfit(outfitUuid, authentication.toUser())
        return ResponseEntity<HttpStatus>(HttpStatus.ACCEPTED)
    }

    @GetMapping("/filter")
    fun getOutfitByName(
        @RequestParam(required = true) name: String,
        authentication: Authentication
    ): ResponseEntity<OutfitDto> {
        return ResponseEntity<OutfitDto>(outfitService.getOutfitByName(name, authentication.toUser()),
            HttpStatus.OK)
    }

    @GetMapping("/random")
    fun getRandomOutfit(authentication: Authentication): ResponseEntity<OutfitDto> {
        return ResponseEntity<OutfitDto>(outfitService.generateRandomOutfit(authentication.toUser()),
            HttpStatus.OK)
    }

    @PostMapping("/generate")
    fun generateOutfit(authentication: Authentication) {
        //TODO: implement logic for generating outfit
    }
}