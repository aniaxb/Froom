package com.froom.froombackend.user

import org.junit.jupiter.api.Test
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import com.fasterxml.jackson.databind.ObjectMapper
import com.froom.froombackend.BaseTest
import com.froom.froombackend.user.model.command.RegisterUserCommand
import com.froom.froombackend.user.model.command.UpdatePasswordCommand
import com.froom.froombackend.user.model.command.UpdateUserCommand

class UserControllerTests: BaseTest() {
    private val objectMapper: ObjectMapper = ObjectMapper()

    @Test
    fun `test getUser`() {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/user")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("janedoe@example.com"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("Jane"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value("Doe"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("janedoe"))
    }

    @Test
    fun `test registerUser` () {
        mockMvc.perform(
            MockMvcRequestBuilders.post("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(RegisterUserCommand(
                    email = "johndoe123@example.com", password = "Password1234@", firstName = "John", lastName = "Doe", username = "johndoe")))
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)

        val newUserToken = testHelper.getAuthToken("johndoe123@example.com", "Password1234@")

        deleteUserWithToken(newUserToken)
    }

    @Test
    fun `test updateUser` () {
        mockMvc.perform(
            MockMvcRequestBuilders.put("/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    objectMapper.writeValueAsString(
                        UpdateUserCommand(
                            email = "johnsmith@example.com", firstName = "John", lastName = "Smith", username = "johnsmith"
                        )
                    )
                )
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isAccepted)
    }

    @Test
    fun `test updatePassword`() {
        mockMvc.perform(
            MockMvcRequestBuilders.put("/user/password")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    objectMapper.writeValueAsString(
                        UpdatePasswordCommand(
                            oldPassword = "Pass1234@", newPassword = "Password4321#", newPasswordConfirmation = "Password4321#"
                        )
                    )
                )
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isAccepted)
    }

    @Test
    fun `test deleteUser` () {
        mockMvc.perform(
            MockMvcRequestBuilders.post("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(RegisterUserCommand(
                    email = "johndoe123@example.com", password = "Password1234@", firstName = "John", lastName = "Doe", username = "johndoe")))
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)

        val newUserToken = testHelper.getAuthToken("johndoe123@example.com", "Password1234@")

        mockMvc.perform(
            MockMvcRequestBuilders.delete("/user")
                .header("Authorization", "Bearer $newUserToken")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
    }

    fun deleteUserWithToken(userToken: String) {
        mockMvc.perform(
            MockMvcRequestBuilders.delete("/user")
                .header("Authorization", "Bearer $userToken")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
    }

}