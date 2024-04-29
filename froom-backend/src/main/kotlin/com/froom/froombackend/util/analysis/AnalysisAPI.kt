package com.froom.froombackend.util.analysis

import com.froom.froombackend.util.analysis.model.AnalysisResponseDto
import okhttp3.MultipartBody
import org.springframework.stereotype.Component
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part
import retrofit2.Call

@Component
interface AnalysisAPI {

    @Multipart
    @POST("/analyse")
    fun analyse(@Part image: MultipartBody.Part): Call<AnalysisResponseDto>
}