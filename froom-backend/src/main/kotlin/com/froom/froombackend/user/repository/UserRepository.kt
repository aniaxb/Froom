package com.froom.froombackend.user.repository

import com.froom.froombackend.user.model.domain.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional
import java.util.UUID

@Repository
interface UserRepository: JpaRepository<User, Long> {

    fun findByEmail(email: String): User?
    fun findByUuid(uuid: UUID): Optional<User>
    fun existsByEmail(email: String): Boolean
}