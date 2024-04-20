package com.froom.froombackend.user.service

import com.froom.froombackend.authorization.service.HashService
import com.froom.froombackend.user.model.command.RegisterUserCommand
import com.froom.froombackend.user.model.command.UpdatePasswordCommand
import com.froom.froombackend.user.model.command.UpdateUserCommand
import com.froom.froombackend.user.model.domain.User
import com.froom.froombackend.user.model.dto.UserDto
import com.froom.froombackend.user.repository.UserRepository
import com.froom.froombackend.user.util.toDto
import jakarta.transaction.Transactional
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService (
    private val userRepository: UserRepository,
    private val hashService: HashService
) {
    val logger: Logger = LoggerFactory.getLogger(this::class.java)

    fun getUser(user: User): UserDto {
        return user.toDto()
    }

    fun findByUuid(uuid: UUID): User? {
        return userRepository.findByUuid(uuid).orElseThrow {
            Exception("User not found")
        }
    }

    fun findByEmail(email: String): User? {
        return userRepository.findByEmail(email)
    }

    fun findByUsername(username: String): User? {
        return userRepository.findByUsername(username)
    }

    fun isUserEmailExists(email: String): Boolean {
        return userRepository.existsByEmail(email)
    }

    @Transactional
    fun registerUser(command: RegisterUserCommand): UserDto {
        if (isUserEmailExists(command.email)) {
            throw Exception("User with email ${command.email} already exists")
        }
        return createUser(command).toDto()
    }

    fun createUser(command: RegisterUserCommand): User {
        val user = User(
            firstName = command.firstName,
            lastName = command.lastName,
            email = command.email,
            password = command.password,
            username = command.username
        )
        return userRepository.save(user)
    }

    @Transactional
    fun removeUser(user: User): UserDto {
        userRepository.delete(user)
        logger.info("User removed: ${user.uuid}")
        return user.toDto()
    }

    @Transactional
    fun updateUser(command: UpdateUserCommand, user: User): UserDto {
        val existingUserByEmail = findByEmail(command.email)
        val existingUserByUsername = findByUsername(command.username)
        if (existingUserByEmail != null && existingUserByEmail.uuid != user.uuid) {
            throw Exception("User with email ${command.email} already exists")
        }
        if (existingUserByUsername != null && existingUserByUsername.uuid != user.uuid) {
            throw Exception("User with username ${command.username} already exists")
        }

        user.email = command.email
        user.username = command.username
        user.firstName = command.firstName
        user.lastName = command.lastName

        logger.info("User updated: ${user.uuid}")
        return userRepository.save(user).toDto()
    }

    @Transactional
    fun updatePassword(command: UpdatePasswordCommand, user: User): UserDto {
        if (!hashService.checkBcrypt(command.oldPassword, user.password)) {
            throw Exception("Invalid old password")
        }

        val newPassword = command.newPassword
        val newPasswordConfirmation = command.newPasswordConfirmation

        when {
            newPassword != newPasswordConfirmation -> {
                throw Exception("New password and confirm password do not match")
            }
            newPassword == command.oldPassword -> {
                throw Exception("New password must be different from the old password")
            }
            else -> {
                user.password = hashService.hashBcrypt(newPassword)
                logger.info("User password updated: ${user.uuid}")
                return userRepository.save(user).toDto()
            }
        }
    }
}