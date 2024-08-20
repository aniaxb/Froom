package com.froom.froombackend.util

import com.froom.froombackend.util.color.ColorExtraction
import com.froom.froombackend.util.color.ColorExtractionAPI
import com.froom.froombackend.util.color.model.ColorResponseDto
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.ResponseBody.Companion.toResponseBody
import okio.IOException
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito.*
import org.mockito.kotlin.anyOrNull
import org.springframework.mock.env.MockEnvironment
import org.springframework.mock.web.MockMultipartFile
import retrofit2.Call
import retrofit2.Response
import retrofit2.Retrofit

class ColorExtractionTest {

    @Test
    fun `test extractColors success`() {
        val file = MockMultipartFile("image", "test.jpg", "image/jpeg", "test".toByteArray())

        // Mock the environment and API dependencies
        val environment = MockEnvironment().withProperty("COLOR_URL", "https://mocked-url.com")

        val api = mock(ColorExtractionAPI::class.java)
        val call = mock(Call::class.java) as Call<ColorResponseDto>
        `when`(api.extractColor(anyOrNull())).thenReturn(call)

        // Create a mock response
        val colorResponse = ColorResponseDto(
            colors = listOf("red", "blue"),
            image = ByteArray(0)
        )
        `when`(call.execute()).thenReturn(Response.success(colorResponse))

        // Create a spy on the ColorExtraction class to mock createApi
        val colorExtraction = spy(ColorExtraction(environment))

        // Mock the Retrofit instance
        val retrofit = mock(Retrofit::class.java)

        // Stub the createApi method to return the mocked Retrofit instance
        doReturn(retrofit).`when`(colorExtraction).createApi(anyString())

        // Stub the creation of the API from the Retrofit instance
        `when`(retrofit.create(ColorExtractionAPI::class.java)).thenReturn(api)

        // Run the actual method and check the result
        val (colors, _) = colorExtraction.getColor(file)
        assertEquals(listOf("red", "blue"), colors)
    }

    @Test
    fun `test extractColors failure`() {
        val file = MockMultipartFile("image", "test.jpg", "image/jpeg", "test".toByteArray())

        // Mock the environment and API dependencies
        val environment = MockEnvironment().withProperty("COLOR_URL", "https://mocked-url.com")

        val api = mock(ColorExtractionAPI::class.java)
        val call = mock(Call::class.java) as Call<ColorResponseDto>
        `when`(api.extractColor(anyOrNull())).thenReturn(call)

        // Create a mock error response
        val errorResponse = Response.error<ColorResponseDto>(400, "Error".toResponseBody("text/plain".toMediaTypeOrNull()))
        `when`(call.execute()).thenReturn(errorResponse)

        // Create a spy on the ColorExtraction class to mock createApi
        val colorExtraction = spy(ColorExtraction(environment))

        // Mock the Retrofit instance
        val retrofit = mock(Retrofit::class.java)

        // Stub the createApi method to return the mocked Retrofit instance
        doReturn(retrofit).`when`(colorExtraction).createApi(anyString())

        // Stub the creation of the API from the Retrofit instance
        `when`(retrofit.create(ColorExtractionAPI::class.java)).thenReturn(api)

        // Run the actual method and check the result
        val exception = assertThrows<IOException> {
            colorExtraction.getColor(file)
        }
        assertEquals("Error while getting color: 400 - Response.error()", exception.message)
    }
}
