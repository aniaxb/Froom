package com.froom.froombackend.util

import okhttp3.OkHttpClient
import okhttp3.Request
import org.slf4j.LoggerFactory
import org.slf4j.Logger
import org.springframework.http.HttpHeaders
import retrofit2.Retrofit
import retrofit2.converter.jackson.JacksonConverterFactory
import java.util.concurrent.TimeUnit

abstract class BaseAdapter {
    protected val logger: Logger = LoggerFactory.getLogger(this::class.java)
    protected abstract val baseUrlKey: String
//protected fun
    fun createApi(baseUrl: String): Retrofit {
        return Retrofit.Builder()
            .baseUrl(baseUrl)
            .client(
                OkHttpClient.Builder()
                    .connectTimeout(100, TimeUnit.SECONDS)
                    .readTimeout(100, TimeUnit.SECONDS)
                    .addInterceptor { chain ->
                        val requestBuilder: Request = chain.request().newBuilder()
                            .addHeader(HttpHeaders.ACCEPT, "application/json")
                            .build()
                        chain.proceed(requestBuilder)
                    }
                    .build()
            )
            .addConverterFactory(JacksonConverterFactory.create())
            .build()
    }

}