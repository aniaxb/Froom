package com.froom.froombackend.items.controller

import com.froom.froombackend.items.model.domain.BodyPart
import com.froom.froombackend.items.model.domain.Category
import com.froom.froombackend.items.service.CategoryService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/category")
class CategoryController (val categoryService: CategoryService) {

    @GetMapping()
    fun getCategories(): ResponseEntity<List<Category>> {
        return ResponseEntity<List<Category>>(categoryService.getCategories(), HttpStatus.OK)
    }

    @GetMapping("/bodypart")
    fun getBodyParts(): ResponseEntity<List<BodyPart>> {
        return ResponseEntity<List<BodyPart>>(categoryService.getBodyParts(), HttpStatus.OK)
    }

    @GetMapping("/bodypart/{bodyPart}")
    fun getCategoriesByBodyPart(@PathVariable bodyPart: BodyPart): ResponseEntity<List<Category>> {
        return ResponseEntity<List<Category>>(categoryService.getCategoriesByBodyPart(bodyPart), HttpStatus.OK)
    }
}