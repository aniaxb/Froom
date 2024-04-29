package com.froom.froombackend.util.color


import com.froom.froombackend.util.BaseAdapter
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.toRequestBody
import org.springframework.core.env.Environment
import org.springframework.stereotype.Component
import org.springframework.web.multipart.MultipartFile
import java.io.IOException

@Component
class ColorExtraction(environment: Environment): BaseAdapter() {
    override val baseUrlKey: String = environment.getRequiredProperty("COLOR_URL")

    fun getColor(file: MultipartFile): Pair<List<String>, ByteArray> {
        val requestBody = file.bytes.toRequestBody("image/jpeg".toMediaTypeOrNull())
        val filePart = MultipartBody.Part.createFormData("image", file.originalFilename, requestBody)

        val response = createApi(baseUrlKey).create(ColorExtractionAPI::class.java).extractColor(filePart).execute()
        if (!response.isSuccessful) {
            logger.error("Error while getting color: ${response.code()} - ${response.message()}")
            throw IOException("Error while getting color: ${response.code()} - ${response.message()}")
        }

        val body = response.body() ?: throw IOException("Empty response body")
        logger.info("Colors: ${body.colors}")
        return body.colors to body.image
    }
}
