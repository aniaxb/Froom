package com.froom.froombackend

import org.junit.jupiter.api.BeforeEach
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.web.servlet.MockMvc

@ContextConfiguration(classes = [TestHelper::class])
@WebMvcTest
abstract class BaseTest {

    @Autowired
    protected lateinit var mockMvc: MockMvc

    @Autowired
    protected lateinit var testHelper: TestHelper

    protected lateinit var token: String

    @BeforeEach
    fun globalSetUp() {
        token = testHelper.getAuthToken("bambi1@example.com", "pass123")
    }
}
