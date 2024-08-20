package com.froom.froombackend.items

import com.fasterxml.jackson.databind.ObjectMapper
import com.froom.froombackend.BaseTest
import com.froom.froombackend.items.model.command.CreateOutfitCommand
import com.froom.froombackend.items.model.command.UpdateItemCommand
import com.froom.froombackend.items.model.command.UpdateOutfitCommand
import com.froom.froombackend.items.model.domain.BodyPart
import com.froom.froombackend.items.model.domain.Category
import com.jayway.jsonpath.JsonPath
import org.junit.jupiter.api.Test
import org.springframework.http.MediaType
import org.springframework.mock.web.MockMultipartFile
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import java.util.UUID

class OutfitControllerTests: BaseTest() {
    private val objectMapper: ObjectMapper = ObjectMapper()

    private var firstCreatedItemId: String = ""
    private var secondCreatedItemId: String = ""
    private var outfitUuid: String = ""

    @Test
    fun `test getAllOutfits`() {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/outfit")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(0))

        createOutfit()

        mockMvc.perform(
            MockMvcRequestBuilders.get("/outfit")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(1))

        deleteOutfitByUuid(outfitUuid)
        deleteItemByUuid(firstCreatedItemId)
        deleteItemByUuid(secondCreatedItemId)
    }

    @Test
    fun `test getOutfitByUuid`() {
        createOutfit()

        mockMvc.perform(
            MockMvcRequestBuilders.get("/outfit/$outfitUuid")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)

        deleteOutfitByUuid(outfitUuid)
        deleteItemByUuid(firstCreatedItemId)
        deleteItemByUuid(secondCreatedItemId)
    }

    @Test
    fun `test createOutfit`() {
        createOutfit()
        deleteOutfitByUuid(outfitUuid)
        deleteItemByUuid(firstCreatedItemId)
        deleteItemByUuid(secondCreatedItemId)
    }

    @Test
    fun `test updateOutfit`() {
        createOutfit()

        mockMvc.perform(
            MockMvcRequestBuilders.put("/outfit/$outfitUuid")
                .header("Authorization", "Bearer $token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    objectMapper.writeValueAsString(
                        UpdateOutfitCommand(
                            name = "New Outfit Name",
                            items = listOf(UUID.fromString(firstCreatedItemId), UUID.fromString(secondCreatedItemId)),
                        )
                    )
                )
        )
            .andExpect(MockMvcResultMatchers.status().isAccepted)

        deleteOutfitByUuid(outfitUuid)
        deleteItemByUuid(firstCreatedItemId)
        deleteItemByUuid(secondCreatedItemId)
    }

    @Test
    fun `test addOutfitItem`() {
        createOutfit()

        val imageFile = MockMultipartFile("image", "test.jpg", "image/jpeg", "test".toByteArray())

//        Create third item
        val thirdItemResult = mockMvc.perform(
            MockMvcRequestBuilders.multipart("/item/create/without-data-analysis")
                .file(imageFile)
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)
            .andReturn()

        val thirdItemResponse = thirdItemResult.response.contentAsString
        val thirdCreatedItemId: String = JsonPath.read(thirdItemResponse, "$.uuid")

        mockMvc.perform(
            MockMvcRequestBuilders.put("/outfit/$outfitUuid/item/$thirdCreatedItemId")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isAccepted)
            .andReturn()

        deleteOutfitByUuid(outfitUuid)
        deleteItemByUuid(firstCreatedItemId)
        deleteItemByUuid(secondCreatedItemId)
        deleteItemByUuid(thirdCreatedItemId)
    }

    @Test
    fun `test removeOutfitItem`() {
        createOutfit()

        val imageFile = MockMultipartFile("image", "test.jpg", "image/jpeg", "test".toByteArray())

//        Create third item
        val thirdItemResult = mockMvc.perform(
            MockMvcRequestBuilders.multipart("/item/create/without-data-analysis")
                .file(imageFile)
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)
            .andReturn()

        val thirdItemResponse = thirdItemResult.response.contentAsString
        val thirdCreatedItemId: String = JsonPath.read(thirdItemResponse, "$.uuid")

//        Add item to outfit
        mockMvc.perform(
            MockMvcRequestBuilders.put("/outfit/$outfitUuid/item/$thirdCreatedItemId")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isAccepted)

//        Remove item from outfit
        mockMvc.perform(
            MockMvcRequestBuilders.delete("/outfit/$outfitUuid/item/$thirdCreatedItemId")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)

        deleteOutfitByUuid(outfitUuid)
        deleteItemByUuid(thirdCreatedItemId)
        deleteItemByUuid(firstCreatedItemId)
        deleteItemByUuid(secondCreatedItemId)
    }

    @Test
    fun `test getOutfitItems`() {

        createOutfit()

        mockMvc.perform(
            MockMvcRequestBuilders.get("/outfit/$outfitUuid/items")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(2))

        deleteOutfitByUuid(outfitUuid)
        deleteItemByUuid(firstCreatedItemId)
        deleteItemByUuid(secondCreatedItemId)
    }

    @Test
    fun `test getOutfitByName`() {
        createOutfit()

        mockMvc.perform(
            MockMvcRequestBuilders.get("/outfit/filter")
                .header("Authorization", "Bearer $token")
                .param("name", "Test Outfit")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)

        deleteOutfitByUuid(outfitUuid)
        deleteItemByUuid(firstCreatedItemId)
        deleteItemByUuid(secondCreatedItemId)
    }

    @Test
    fun `test duplicateOutfit`() {
        createOutfit()

        val duplicateResult = mockMvc.perform(
            MockMvcRequestBuilders.post("/outfit/$outfitUuid/duplicate")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)
            .andReturn()

        val duplicateResponse = duplicateResult.response.contentAsString
        val duplicateUuid: String = JsonPath.read(duplicateResponse, "$.uuid")

        deleteOutfitByUuid(outfitUuid)
        deleteOutfitByUuid(duplicateUuid)
        deleteItemByUuid(firstCreatedItemId)
        deleteItemByUuid(secondCreatedItemId)
    }

    @Test
    fun `test generateRandomOutfit`() {
        val createdItemsUuids: MutableList<String> = mutableListOf()
        val bodyParts = BodyPart.entries.filter { it != BodyPart.UNKNOWN }

        for (i in 0 until 4) {
            val imageFile = MockMultipartFile("image", "test.jpg", "image/jpeg", "test".toByteArray())

            val result = mockMvc.perform(
                MockMvcRequestBuilders.multipart("/item/create/without-data-analysis")
                    .file(imageFile)
                    .header("Authorization", "Bearer $token")
            )
                .andExpect(MockMvcResultMatchers.status().isCreated)
                .andReturn()

            val response = result.response.contentAsString
            val uuid: String = JsonPath.read(response, "$.uuid")

            createdItemsUuids.add(uuid)

            val correspondingCategories = Category.entries.filter { it.bodyPart == bodyParts[i % bodyParts.size] }

            mockMvc.perform(
                MockMvcRequestBuilders.put("/item/$uuid")
                    .header("Authorization", "Bearer $token")
                    .contentType("application/json")
                    .content(
                        objectMapper.writeValueAsString(
                            UpdateItemCommand(
                                category = correspondingCategories[i % correspondingCategories.size],
                                bodyPart = bodyParts[i],
                                color = listOf("blue")
                            )
                        )
                    )
            )
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andReturn()
        }

        val randomOutfitResult = mockMvc.perform(
            MockMvcRequestBuilders.get("/outfit/random")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andReturn()

        val randomOutfitResponse = randomOutfitResult.response.contentAsString
        val randomOutfitUuid: String = JsonPath.read(randomOutfitResponse, "$.uuid")

        deleteOutfitByUuid(randomOutfitUuid)

        for (uuid in createdItemsUuids) {
            deleteItemByUuid(uuid)
        }
    }

    fun createOutfit() {
        val imageFile = MockMultipartFile("image", "test.jpg", "image/jpeg", "test".toByteArray())

//        Create First Item
        val firstItemResult = mockMvc.perform(
            MockMvcRequestBuilders.multipart("/item/create/without-data-analysis")
                .file(imageFile)
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)
            .andReturn()

        val firstItemResponse = firstItemResult.response.contentAsString
        firstCreatedItemId = JsonPath.read(firstItemResponse, "$.uuid")

//        Update First Item BodyPart and Category
        mockMvc.perform(
            MockMvcRequestBuilders.put("/item/${firstCreatedItemId}")
                .header("Authorization", "Bearer $token")
                .contentType("application/json")
                .content(
                    objectMapper.writeValueAsString(
                        UpdateItemCommand(
                            category = Category.SNEAKERS,
                            bodyPart = BodyPart.SHOES,
                            color = listOf("red")
                        )
                    )
                )
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andReturn()

//        Create second item
        val secondItemResult = mockMvc.perform(
            MockMvcRequestBuilders.multipart("/item/create/without-data-analysis")
                .file(imageFile)
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)
            .andReturn()

        val secondItemResponse = secondItemResult.response.contentAsString
        secondCreatedItemId = JsonPath.read(secondItemResponse, "$.uuid")

//        Update Second Item BodyPart and Category
        mockMvc.perform(
            MockMvcRequestBuilders.put("/item/${firstCreatedItemId}")
                .header("Authorization", "Bearer $token")
                .contentType("application/json")
                .content(
                    objectMapper.writeValueAsString(
                        UpdateItemCommand(
                            category = Category.TROUSERS,
                            bodyPart = BodyPart.BOTTOM,
                            color = listOf("blue")
                        )
                    )
                )
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andReturn()

//        Create Outfit
        val outfitResult =  mockMvc.perform(
            MockMvcRequestBuilders.post("/outfit")
                .header("Authorization", "Bearer $token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    objectMapper.writeValueAsString(
                        CreateOutfitCommand(
                            name = "Test Outfit",
                            itemUuids = listOf(UUID.fromString(firstCreatedItemId), UUID.fromString(secondCreatedItemId)),
                        )
                    )
                )
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)
            .andReturn()

        val outfitResponse = outfitResult.response.contentAsString
        outfitUuid = JsonPath.read(outfitResponse, "$.uuid")
    }

//    @Test
//    fun `test deleteOutfit`() {
//        mockMvc.perform(
//            MockMvcRequestBuilders.delete("/outfit")
//                .header("Authorization", "Bearer $token")
//        )
//            .andExpect(MockMvcResultMatchers.status().isOk)
//    }

    fun deleteItemByUuid(uuid: String) {
        mockMvc.perform(
            MockMvcRequestBuilders.delete("/item/$uuid")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isAccepted)
    }

    fun deleteOutfitByUuid(uuid: String) {
        mockMvc.perform(
            MockMvcRequestBuilders.delete("/outfit/$uuid")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isAccepted)
    }
}