package com.froom.froombackend

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

data class LoginAuthCommand(val email: String, val password: String)
data class TokenDto(val accessToken: String)

@Component
class TestHelper @Autowired constructor(
    private val mockMvc: MockMvc,
    private val objectMapper: ObjectMapper
) {
    fun getAuthToken(email: String, password: String): String {
        val loginCommand = LoginAuthCommand(email = email, password = password)
        val loginResponse = mockMvc.perform(MockMvcRequestBuilders.post("/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(loginCommand)))
            .andExpect(MockMvcResultMatchers.status().isAccepted)
            .andReturn()

        val responseContent = loginResponse.response.contentAsString
        val tokenDto = objectMapper.readValue(responseContent, TokenDto::class.java)
        return tokenDto.accessToken
    }
}
