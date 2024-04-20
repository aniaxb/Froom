package com.froom.froombackend.authorization.config

import com.nimbusds.jose.jwk.source.ImmutableSecret
import com.nimbusds.jose.proc.SecurityContext
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.security.oauth2.jwt.JwtEncoder
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder
import javax.crypto.spec.SecretKeySpec

@Configuration
class JwtConfig (
    @Value("\${spring.security.jwt.secret}")
    private val jwtKey: String,
    @Value("\${spring.security.algorithm}")
    private val algorithm: String,
) {
    private val secretKey = SecretKeySpec(jwtKey.toByteArray(), algorithm)

    @Bean
    fun jwtDecoder(): JwtDecoder {
        return NimbusJwtDecoder.withSecretKey(secretKey).build()
    }
    @Bean
    fun jwtEncoder(): JwtEncoder {
        val secret = ImmutableSecret<SecurityContext>(secretKey)
        return NimbusJwtEncoder(secret)
    }
}