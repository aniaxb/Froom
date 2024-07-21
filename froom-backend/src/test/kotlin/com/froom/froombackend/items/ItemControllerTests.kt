package com.froom.froombackend.another

import org.junit.jupiter.api.Test
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import com.froom.froombackend.BaseTest

@WebMvcTest
class ItemControllerTests : BaseTest() {

    @Test
    fun `test getAllItems`() {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/item")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.data.length()").value(2))

    }
}
