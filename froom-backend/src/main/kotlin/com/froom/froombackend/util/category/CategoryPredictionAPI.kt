package com.froom.froombackend.util.category

import com.froom.froombackend.util.category.model.CategoryResponseDto
import okhttp3.MultipartBody
import org.springframework.stereotype.Component
import retrofit2.Call
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

@Component
interface CategoryPredictionAPI {

    @Multipart
    @POST("/predictCategory")
    fun predictCategory(@Part file: MultipartBody.Part): Call<CategoryResponseDto>
}