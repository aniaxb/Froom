package com.froom.froombackend.authorization.config

import com.froom.froombackend.authorization.service.TokenService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.filter.CorsFilter


@Configuration
@EnableWebSecurity
class SecurityConfig (
    private val tokenService: TokenService,
) {
    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http.authorizeHttpRequests { authorizeHttpRequests ->
            authorizeHttpRequests
                //Authentication APIs
                .requestMatchers(HttpMethod.POST,   "/auth/*").permitAll()
                .requestMatchers(HttpMethod.PUT,    "/auth/*").permitAll()
                .requestMatchers(HttpMethod.POST,   "/user/register").permitAll()
                .anyRequest().authenticated()

        }.oauth2ResourceServer { oauth2ResourceServer ->
            oauth2ResourceServer.jwt{ jwt ->
                jwt
            }
        }.authenticationManager { authenticationManager ->
            val jwt = authenticationManager as BearerTokenAuthenticationToken
            val user = tokenService.checkTokenAndReturnUser(jwt.token) ?: throw InvalidBearerTokenException("Invalid token")
            UsernamePasswordAuthenticationToken(user, "", listOf(SimpleGrantedAuthority("USER")))
        }.csrf { csrf ->
            csrf.disable()
        }.sessionManagement { sessionManagement ->
            sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        }.headers { headers ->
            headers.frameOptions { frameOptions ->
                frameOptions.disable()
            }.xssProtection { xssProtection ->
                xssProtection.disable()
            }
        }
            .cors{ cors ->
                cors.configurationSource { _ ->
                    val configuration = CorsConfiguration()
                    configuration.allowedOrigins = listOf("http://127.0.0.1:5173", "http://localhost:5173")
                    configuration.allowedMethods = listOf("*")
                    configuration.allowedHeaders = listOf("*")
                    configuration.allowCredentials = true
                    configuration.maxAge = 3600L
                    configuration
                }
        }.addFilterBefore(ExceptionHandlerFilter(), CorsFilter::class.java)

        return http.build()
    }
}