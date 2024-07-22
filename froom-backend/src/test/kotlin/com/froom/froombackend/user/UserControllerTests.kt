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
import com.froom.froombackend.user.model.command.RegisterUserCommand
import org.junit.jupiter.api.AfterEach

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

    fun deleteUser() {
        mockMvc.perform (
            MockMvcRequestBuilders.delete("/user")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
    }

    @BeforeEach
    fun setUp() {
        val registerUserCommand = RegisterUserCommand(
            email = "janedoe123@example.com",
            password = "pass123",
            firstName = "Jane",
            lastName = "Doe",
            username = "janedoe"
        )
        mockMvc.perform(
            MockMvcRequestBuilders.post("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerUserCommand))
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)

        val loginCommand = LoginAuthCommand(email = "janedoe123@example.com", password = "pass123")
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

    @AfterEach
    fun tearDown() {
       deleteUser()
    }

    @Test
    fun `test getUser`() {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/user")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("janedoe123@example.com"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("Jane"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value("Doe"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("janedoe"))
    }

    @Test
    fun `test registerUser` () {
    }


}