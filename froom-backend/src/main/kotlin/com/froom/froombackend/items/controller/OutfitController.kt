package com.froom.froombackend.items.controller

import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/outfit")
class OutfitController {

    @PostMapping()
    fun createOutfit() {
    }

    @PutMapping("/{outfitUuid}/item/{itemUuid}")
    fun addItemToOutfit(
        @PathVariable outfitUuid: String,
        @PathVariable itemUuid: String
    ) {
    }

    @DeleteMapping("/{outfitUuid}/item/{itemUuid}")
    fun removeItemFromOutfit(
        @PathVariable outfitUuid: String,
        @PathVariable itemUuid: String
    ) {
    }

    @GetMapping("/{outfitUuid}")
    fun getOutfitByUuid(
        @PathVariable outfitUuid: String
    ) {
    }

    @GetMapping()
    fun getOutfits() {
    }

    @PutMapping("/{outfitUuid}")
    fun updateOutfit(
        @PathVariable outfitUuid: String
    ) {
    }

    @DeleteMapping("/{outfitUuid}")
    fun deleteOutfit(
        @PathVariable outfitUuid: String
    ) {
    }

    @GetMapping("/filter")
    fun getOutfitsByFilter(
        @RequestParam(required = false) name: String?,
    ) {
    }

    @GetMapping("/random")
    fun getRandomOutfit() {
    }

    @PostMapping("/random")
    fun createRandomOutfit() {
    }
}