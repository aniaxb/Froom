package com.froom.froombackend.util.category

import com.froom.froombackend.items.model.domain.Category
import com.froom.froombackend.util.BaseAdapter
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.toRequestBody
import org.springframework.core.env.Environment
import org.springframework.stereotype.Component
import org.springframework.web.multipart.MultipartFile

@Component
class CategoryPrediction(environment: Environment): BaseAdapter() {
    override val baseUrlKey: String = environment.getRequiredProperty("CATEGORY_URL")

    fun getCategory(file: MultipartFile): Category {

        val requestFile = file.bytes.toRequestBody("multipart/form-data".toMediaTypeOrNull(), 0)
        val filePart = MultipartBody.Part.createFormData("image", file.originalFilename, requestFile)
        val response = createApi(baseUrlKey).create(CategoryPredictionAPI::class.java).predictCategory(filePart).execute()

        return if (!response.isSuccessful) {
            logger.error("Error while getting category")
            Category.UNKNOWN
        } else {
            logger.info("Category: ${response.body()?.category}")
            Category.valueOf(response.body()?.category?.uppercase() ?: "UNKNOWN")
        }
    }
}