package com.froom.froombackend.util.color

import com.froom.froombackend.util.color.model.ColorResponseDto
import okhttp3.MultipartBody
import org.springframework.stereotype.Component
import retrofit2.Call
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

@Component
interface ColorExtractionAPI {

    @Multipart
    @POST("/extractColor")
    fun extractColor(@Part file: MultipartBody.Part): Call<ColorResponseDto>

}