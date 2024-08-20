package com.froom.froombackend.authorization

import com.fasterxml.jackson.databind.ObjectMapper
import com.froom.froombackend.BaseTest
import com.froom.froombackend.authorization.model.command.LoginAuthCommand
import com.froom.froombackend.user.model.command.RegisterUserCommand
import org.junit.jupiter.api.Test
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

class AuthorizationControllerTests : BaseTest() {
    private val objectMapper: ObjectMapper = ObjectMapper()

    @Test
    fun `test login`() {
        mockMvc.perform(
            MockMvcRequestBuilders.post("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(
                    RegisterUserCommand(email = "johndoe123@example.com", password ="Password1234@", firstName = "John", lastName = "Doe", username = "johndoe")))
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)

        mockMvc.perform(
            MockMvcRequestBuilders.post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(LoginAuthCommand(email = "johndoe123@example.com", password = "Password1234@")))
        )
            .andExpect(MockMvcResultMatchers.status().isAccepted)

        val newUserToken = testHelper.getAuthToken("johndoe123@example.com", "Password1234@")

        mockMvc.perform(
            MockMvcRequestBuilders.delete("/user")
                .header("Authorization", "Bearer $newUserToken")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
    }
}