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
import com.froom.froombackend.BaseTest
import com.froom.froombackend.FroomBackendApplication
import com.froom.froombackend.user.model.command.RegisterUserCommand
import com.froom.froombackend.user.model.command.UpdatePasswordCommand
import org.junit.jupiter.api.AfterEach


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
                    email = "", password = "", firstName = "", lastName = "", username = "")))
        )
            .andExpect(MockMvcResultMatchers.status().isBadRequest)
    }

    @Test
    fun `test updateUser` () {
        mockMvc.perform(
            MockMvcRequestBuilders.put("/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    objectMapper.writeValueAsString(
                        RegisterUserCommand(
                            email = "", password = "", firstName = "", lastName = "", username = ""
                        )
                    )
                )
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isBadRequest)
    }

    @Test
    fun `test deleteUser` () {
        mockMvc.perform(
            MockMvcRequestBuilders.delete("/user")
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun `test updatePassword`() {
        mockMvc.perform(
            MockMvcRequestBuilders.put("/user/password")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    objectMapper.writeValueAsString(
                        UpdatePasswordCommand(
                            oldPassword = "", newPassword = "", newPasswordConfirmation = ""
                        )
                    )
                )
                .header("Authorization", "Bearer $token")
        )
            .andExpect(MockMvcResultMatchers.status().isBadRequest)
    }



}