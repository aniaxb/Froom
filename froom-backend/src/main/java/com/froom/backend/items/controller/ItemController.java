package com.froom.backend.items.controller;

import com.froom.backend.items.model.domain.BodyPart;
import com.froom.backend.items.model.domain.Type;
import com.froom.backend.items.model.dto.ItemDto;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("items")
public class ItemController {

//    HttpServletRequest request - pobrać usera z kontekstu
    @GetMapping("/items")
    public void getUserItems() {

    }

    @GetMapping("/items/{id}")
    public void getItem() {

    }

    @GetMapping("search")
    public List<ItemDto> getFilter(
            @RequestParam(required = false) String name,
            @RequestParam(required = false)BodyPart part,
            @RequestParam(required = false)Type type
            ) {
//        szukac czy nie jest nullen
        return null;
    }

    @PostMapping("/add-item")
    public void addItem() {

    }

    @DeleteMapping("/deleteItem/{id}")
    public void deleteItem () {

    }

    @PutMapping("/edit/{id}")
    public void editItem() {

    }

    @GetMapping("/item/{id}/image")
    public void getItemImage() {

    }

    @GetMapping("items-lite")
    public void getUserItemsWithoutImage() {

    }

}
