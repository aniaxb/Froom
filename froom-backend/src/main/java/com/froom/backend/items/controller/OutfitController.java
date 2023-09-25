package com.froom.backend.items.controller;

import org.springframework.web.bind.annotation.*;

@RestController("outfit")
public class OutfitController {

    @PostMapping("/create-outfit")
    public void createOutfit() {

    }

    @GetMapping("/outfits")
    public void getUserOutfits() {

    }

    @GetMapping("/outfit/{id}")
    public void getOutfit() {

    }

    @PutMapping("/update/{id}")
    public void updateOutfit() {

    }

    @PutMapping("/add-item-to-outfit/{outfitID}/{itemID}")
    public void addItemToOutfit() {

    }

    @PutMapping("/remove-item-from-outfit/{outfitID}/{itemID}")
    public void removeItemFromOutfit() {

    }

    @DeleteMapping("/delete/{id}")
    public void deleteOutfit() {

    }

    @GetMapping("/random")
    public void getRandomOutfit() {

    }
}
