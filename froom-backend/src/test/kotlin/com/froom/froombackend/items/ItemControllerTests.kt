package com.froom.froombackend.items

import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import com.froom.froombackend.BaseTest
import com.froom.froombackend.items.model.command.UpdateItemCommand
import com.froom.froombackend.items.model.domain.BodyPart
import com.froom.froombackend.items.model.domain.Category
import com.jayway.jsonpath.JsonPath
import org.springframework.mock.web.MockMultipartFile

class ItemControllerTests : BaseTest() {
    private val objectMapper: ObjectMapper = ObjectMapper()


    @Test
    fun `test getAllItems`() {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/item")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(0))
    }

//    This also tests the deleteItemByUuid function
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

        deleteItemByUuid(createdItemId)
    }

//    @Test
//    fun `test createItem`() {
//        val imageFile = MockMultipartFile("image", "test.jpg", "image/jpeg", "test".toByteArray())
//
//        val category = Category.TSHIRT
//        val color = listOf("red")
//        val image = ByteArray(0)
//
//        `when`(categoryPrediction.getCategory(imageFile)).thenReturn(category)
//        `when`(colorExtraction.getColor(imageFile)).thenReturn(Pair(color, image))
//
//        val result = mockMvc.perform(
//            MockMvcRequestBuilders.multipart("/item/create")
//                .file(imageFile)
//                .header("Authorization", "Bearer $token")
//        )
//            .andExpect(MockMvcResultMatchers.status().isCreated)
//            .andReturn()
//
//        val response = result.response.contentAsString
//        val createdItemId: String = JsonPath.read(response, "$.uuid")
//
//        deleteItemByUuid(createdItemId)
//    }

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

        deleteItemByUuid(createdItemId)
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
                .contentType("application/json")
                .content(
                    objectMapper.writeValueAsString(
                        UpdateItemCommand(
                            category = Category.SNEAKERS,
                            bodyPart = BodyPart.SHOES,
                            color = listOf("Red")
                        )
                    )
                )
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andReturn()

        deleteItemByUuid(createdItemId)
    }

    @Test
    fun `test updateItemImage`() {
        val imageFile = MockMultipartFile("image", "test.jpg", "image/jpeg", "test".toByteArray())
        val updatedImageFile = MockMultipartFile("image", "test123.jpg", "image/jpeg", "test123".toByteArray())

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
            MockMvcRequestBuilders.multipart("/item/${createdItemId}/image")
                .file(updatedImageFile)
                .header("Authorization", "Bearer $token")
                .with { request ->
                    request.method = "PUT"
                    request
                }
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andReturn()

        deleteItemByUuid(createdItemId)
    }

    @Test
    fun `test getItemsByFilter`() {
        val category = Category.TSHIRT
        val bodyPart = BodyPart.TOP
        val color = "red"

        mockMvc.perform(
            MockMvcRequestBuilders.get("/item/filter")
                .param("category", category.toString())
                .param("bodyPart", bodyPart.toString())
                .param("color", color)
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(0))
    }

    //    Change the function argument to take an existing uuid
//    @Test
//    fun `test deleteItemByUuid`() {
//        val uuids = mutableListOf<String>("da5f8387-fd71-4abc-b3ca-697409fc7dda", "9b6acdd8-cd45-4984-8f3c-0d79815a2546",
//            "2a590c5d-fc73-46f6-bdca-8f12ed8aa23b", "748a3cfd-de8d-4dcf-8e4f-564f1bf2dced", "856931f2-23e5-43bb-b14e-bea970657932")
//        for (uuid in uuids) {
//            deleteItemByUuid(uuid)
//        }
////        deleteItemByUuid("0319c21c-2d63-4f9b-8147-703c000b6cfc")
//    }

    fun deleteItemByUuid(uuid: String) {
        mockMvc.perform(
            MockMvcRequestBuilders.delete("/item/$uuid")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isAccepted)
    }
}
