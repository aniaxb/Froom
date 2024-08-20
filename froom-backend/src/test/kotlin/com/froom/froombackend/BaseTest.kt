package com.froom.froombackend

import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

@SpringBootTest(classes = [FroomBackendApplication::class])
@AutoConfigureMockMvc
abstract class BaseTest {

    @Autowired
    protected lateinit var mockMvc: MockMvc

    @Autowired
    protected lateinit var testHelper: TestHelper

    protected lateinit var token: String

    @BeforeEach
    fun globalSetUp() {
        testHelper.registerUser("janedoe@example.com", "Pass1234@", "Jane", "Doe", "janedoe")
        token = testHelper.getAuthToken("janedoe@example.com", "Pass1234@")
    }

    @AfterEach
    fun globalTearDown() {
        mockMvc.perform (
            MockMvcRequestBuilders.delete("/user")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
    }

}
