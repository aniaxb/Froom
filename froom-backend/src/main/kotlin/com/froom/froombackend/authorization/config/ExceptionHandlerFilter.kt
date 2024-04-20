package com.froom.froombackend.authorization.config

import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.web.filter.OncePerRequestFilter
import org.springframework.web.multipart.MultipartException
import java.io.IOException
import kotlin.jvm.Throws

class ExceptionHandlerFilter: OncePerRequestFilter() {
    @Throws(
        ServletException::class,
        IOException::class,
        MultipartException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain) {
        try {
            filterChain.doFilter(request, response)
        } catch (e: RuntimeException) {
            response.status = HttpServletResponse.SC_FORBIDDEN
            response.writer.write("Unknown error")
        }
    }
}