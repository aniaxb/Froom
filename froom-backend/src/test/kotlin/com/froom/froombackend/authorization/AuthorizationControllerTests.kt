package com.froom.froombackend.authorization

import com.fasterxml.jackson.databind.ObjectMapper
import com.froom.froombackend.BaseTest
import com.froom.froombackend.authorization.model.command.LoginAuthCommand
import org.junit.jupiter.api.Test
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

class AuthorizationControllerTests : BaseTest() {
    private val objectMapper: ObjectMapper = ObjectMapper()

    @Test
    fun `test login`() {
        mockMvc.perform(
            MockMvcRequestBuilders.post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(LoginAuthCommand(email = "janedoe@example.com", password = "pass123")))
        )
            .andExpect(MockMvcResultMatchers.status().isAccepted)
    }
}