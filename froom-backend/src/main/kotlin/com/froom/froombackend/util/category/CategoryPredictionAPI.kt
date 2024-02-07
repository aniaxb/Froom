package com.froom.froombackend.util.category

import org.springframework.web.bind.annotation.PostMapping

interface CategoryPredictionAPI {

    @PostMapping("/predictCategory")
    fun predictCategory(): String
}