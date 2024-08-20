package com.froom.froombackend.util

import com.froom.froombackend.BaseTest
import com.froom.froombackend.items.model.domain.Category
import com.froom.froombackend.util.category.CategoryPrediction
import com.froom.froombackend.util.category.CategoryPredictionAPI
import com.froom.froombackend.util.category.model.CategoryResponseDto
import okhttp3.ResponseBody.Companion.toResponseBody
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mockito.*
import org.mockito.junit.jupiter.MockitoExtension
import org.mockito.kotlin.anyOrNull
import org.springframework.mock.env.MockEnvironment
import org.springframework.mock.web.MockMultipartFile
import retrofit2.Call
import retrofit2.Response
import retrofit2.Retrofit

@ExtendWith(MockitoExtension::class)
class CategoryPredictionTest: BaseTest() {

    @Test
    fun `test getCategory`() {
        val file = MockMultipartFile("image", "test.jpg", "image/jpeg", "test".toByteArray())
        val categoryPrediction = mock(CategoryPrediction::class.java)
        `when`(categoryPrediction.getCategory(file)).thenReturn(Category.UNKNOWN)
        assertEquals(Category.UNKNOWN, categoryPrediction.getCategory(file))
    }

    @Test
    fun `test getCategory success`() {
        val file = MockMultipartFile("image", "test.jpg", "image/jpeg", "test".toByteArray())

        // Mock the environment and API dependencies
        val environment = MockEnvironment().withProperty("CATEGORY_URL", "https://mocked-url.com")

        val api = mock(CategoryPredictionAPI::class.java)
        val call = mock(Call::class.java) as Call<CategoryResponseDto>
        `when`(api.predictCategory(anyOrNull())).thenReturn(call)

        val categoryResponse = CategoryResponseDto("SNEAKERS", 0.9)
        `when`(call.execute()).thenReturn(Response.success(categoryResponse))

        // Create a spy on the CategoryPrediction class to mock createApi
        val categoryPrediction = spy(CategoryPrediction(environment))

        // Mock the Retrofit instance
        val retrofit = mock(Retrofit::class.java)

        // Stub the createApi method to return the mocked Retrofit instance
        doReturn(retrofit).`when`(categoryPrediction).createApi(anyString())

        // Stub the creation of the API from the Retrofit instance
        `when`(retrofit.create(CategoryPredictionAPI::class.java)).thenReturn(api)

        // Run the actual method and check the result
        val result = categoryPrediction.getCategory(file)
        assertEquals(Category.SNEAKERS, result)
    }

    @Test
    fun `test getCategory failure`() {
        val file = MockMultipartFile("image", "test.jpg", "image/jpeg", "test".toByteArray())

        // Mock the environment
        val environment = MockEnvironment().withProperty("CATEGORY_URL", "https://mocked-url.com")

        // Create a real instance of CategoryPrediction and spy on it
        val categoryPrediction = spy(CategoryPrediction(environment))

        // Mock the Retrofit instance
        val retrofit = mock(Retrofit::class.java)
        val api = mock(CategoryPredictionAPI::class.java)
        val call = mock(Call::class.java) as Call<CategoryResponseDto>

        // Stub the createApi method to return the mocked Retrofit instance
        doReturn(retrofit).`when`(categoryPrediction).createApi(anyString())

        // Stub the creation of the API from the Retrofit instance
        `when`(retrofit.create(CategoryPredictionAPI::class.java)).thenReturn(api)

        // Simulate a failure API response
        `when`(api.predictCategory(anyOrNull())).thenReturn(call)
        `when`(call.execute()).thenReturn(Response.error(500, "Internal Server Error".toResponseBody(null)))

        // Run the actual method and check the result
        val result = categoryPrediction.getCategory(file)
        assertEquals(Category.UNKNOWN, result)
    }

}