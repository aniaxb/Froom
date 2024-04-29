package com.froom.froombackend.util.analysis

import com.froom.froombackend.items.model.domain.Category
import com.froom.froombackend.util.BaseAdapter
import com.froom.froombackend.util.analysis.model.AnalysisResponseDto
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.toRequestBody
import org.springframework.core.env.Environment
import org.springframework.stereotype.Component
import org.springframework.web.multipart.MultipartFile

@Component
class AnalysisAdapter(environment: Environment): BaseAdapter() {
    override val baseUrlKey: String = environment.getRequiredProperty("ANALYSIS_URL")

    fun getAnalysis(file: MultipartFile): AnalysisResponseDto {
        val requestFile = file.bytes.toRequestBody("multipart/form-data".toMediaTypeOrNull(), 0)
        val filePart = MultipartBody.Part.createFormData("image", file.originalFilename, requestFile)
        val response = createApi(baseUrlKey).create(AnalysisAPI::class.java).analyse(filePart).execute()

        return if (!response.isSuccessful) {
            logger.error("Error while getting analysis")
            AnalysisResponseDto(Category.BAG, 0.0, emptyList(), ByteArray(0))
        } else {
            logger.info("Analysis: ${response.body()?.predictedCategory}")
//            response.body() ?: AnalysisResponseDto("", 0.0, emptyList(), ByteArray(0))
            response.body()?.let {
                AnalysisResponseDto(it.predictedCategory, it.confidence, it.colors, it.image)
            } ?: AnalysisResponseDto(Category.BAG, 0.0, emptyList(), ByteArray(0))
        }
    }
}