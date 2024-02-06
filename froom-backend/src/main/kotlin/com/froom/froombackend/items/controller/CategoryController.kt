package com.froom.froombackend.items.controller

import com.froom.froombackend.items.service.CategoryService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/category")
class CategoryController (val categoryService: CategoryService){

    @GetMapping()
    fun getCategories() {

    }

    @GetMapping("/bodypart")
    fun getBodyPartCategories() {

    }
}