package com.froom.froombackend.items

import org.junit.jupiter.api.Test
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import com.froom.froombackend.BaseTest
import com.jayway.jsonpath.JsonPath
import org.springframework.mock.web.MockMultipartFile

class ItemControllerTests : BaseTest() {

    @Test
    fun `test getAllItems`() {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/item")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(0))
    }

    @Test
    fun `test deleteItemByUuid`() {
        mockMvc.perform(
            MockMvcRequestBuilders.delete("/item/b36f036b-5fc5-4a92-b5de-a22e3d8531f3")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isAccepted)
    }

    @Test
    fun `test createItemWithoutDataAnalysis`() {
        val imageFile = MockMultipartFile("image", "test.jpg", "image/jpeg", "test".toByteArray())

        val result = mockMvc.perform(
            MockMvcRequestBuilders.multipart("/item/create/without-data-analysis")
                .file(imageFile)
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)
            .andReturn()

        val response = result.response.contentAsString
        val createdItemId: String = JsonPath.read(response, "$.uuid")

        mockMvc.perform(
            MockMvcRequestBuilders.delete("/item/${createdItemId}")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isAccepted)
    }

    @Test
    fun `test getItemByUuid`() {
        val imageFile = MockMultipartFile("image", "test.jpg", "image/jpeg", "test".toByteArray())

        val result = mockMvc.perform(
            MockMvcRequestBuilders.multipart("/item/create/without-data-analysis")
                .file(imageFile)
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)
            .andReturn()

        val response = result.response.contentAsString
        val createdItemId: String = JsonPath.read(response, "$.uuid")

        mockMvc.perform(
            MockMvcRequestBuilders.get("/item/${createdItemId}")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andReturn()
    }

    @Test
    fun `test updateItem`() {
        val imageFile = MockMultipartFile("image", "test.jpg", "image/jpeg", "test".toByteArray())

        val result = mockMvc.perform(
            MockMvcRequestBuilders.multipart("/item/create/without-data-analysis")
                .file(imageFile)
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)
            .andReturn()

        val response = result.response.contentAsString
        val createdItemId: String = JsonPath.read(response, "$.uuid")

        mockMvc.perform(
            MockMvcRequestBuilders.put("/item/${createdItemId}")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andReturn()

        mockMvc.perform(
            MockMvcRequestBuilders.delete("/item/${createdItemId}")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isAccepted)
    }

    @Test
    fun `test updateItemImage`() {
        val imageFile = MockMultipartFile("image", "test.jpg", "image/jpeg", "test".toByteArray())

        val result = mockMvc.perform(
            MockMvcRequestBuilders.multipart("/item/create/without-data-analysis")
                .file(imageFile)
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)
            .andReturn()

        val response = result.response.contentAsString
        val createdItemId: String = JsonPath.read(response, "$.uuid")

//        mockMvc.perform(
//            MockMvcRequestBuilders.put("/item/${createdItemId}/image")
//                .file(imageFile)
//                .header("Authorization", "Bearer $token")
//        )
//            .andExpect(MockMvcResultMatchers.status().isOk)
//            .andReturn()

        mockMvc.perform(
            MockMvcRequestBuilders.multipart("/item/${createdItemId}/image")
                .file(imageFile)
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)
            .andReturn()

        mockMvc.perform(
            MockMvcRequestBuilders.delete("/item/${createdItemId}")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isAccepted)
    }

    @Test
    fun `test getItemsByFilter`() {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/item/filter")
                .content("category=TOP, bodyPart=UPPER_BODY, color=RED")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(0))
    }

}
