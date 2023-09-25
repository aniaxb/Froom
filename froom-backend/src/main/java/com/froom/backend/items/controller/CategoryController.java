package com.froom.backend.items.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("categories")
public class CategoryController {

    @GetMapping("/type")
    public void getTypeCategories() {

    }

    @GetMapping("/body-part")
    public void getBodyPartCategories() {

    }
}
