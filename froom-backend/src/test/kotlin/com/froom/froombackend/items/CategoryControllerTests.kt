package com.froom.froombackend.items

import com.froom.froombackend.BaseTest
import com.froom.froombackend.items.model.domain.BodyPart
import org.junit.jupiter.api.Test
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

class CategoryControllerTests: BaseTest() {

    @Test
    fun `test getCategories`() {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/category")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(11))
    }

    @Test
    fun `test getBodyParts`() {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/category/bodypart")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(5))
    }

    @Test
    fun `test getCategoriesByBodyPart`() {
        val bodyPart = BodyPart.TOP

        mockMvc.perform(
            MockMvcRequestBuilders.get("/category/bodypart/$bodyPart")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(5))
    }
}