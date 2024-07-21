import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import com.fasterxml.jackson.databind.ObjectMapper
import com.froom.froombackend.FroomBackendApplication

@SpringBootTest(classes = [FroomBackendApplication::class])
@AutoConfigureMockMvc
class UserControllerTests {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    private lateinit var token: String

    data class LoginAuthCommand(val email: String, val password: String)
    data class TokenDto(val accessToken: String)

    @BeforeEach
    fun setUp() {
        val loginCommand = LoginAuthCommand(email = "bambi1@example.com", password = "pass123")
        val loginResponse = mockMvc.perform(
            MockMvcRequestBuilders.post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginCommand))
        )
            .andExpect(MockMvcResultMatchers.status().isAccepted)
            .andReturn()

        val tokenDto = objectMapper.readValue(loginResponse.response.contentAsString, TokenDto::class.java)
        token = tokenDto.accessToken
    }

    @Test
    fun `test getUser`() {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/user")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("bambi1@example.com"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("Jelonek"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value("Bambi"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("bambi1"))
    }


}