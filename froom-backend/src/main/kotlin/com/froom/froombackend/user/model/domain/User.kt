package com.froom.froombackend.user.model.domain

import jakarta.persistence.*
import lombok.AllArgsConstructor
import lombok.NoArgsConstructor
import org.hibernate.annotations.GenericGenerator
import java.util.*

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="\"User\"")
class User(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long? = null,

    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(unique = true)
    val uuid: UUID = UUID.randomUUID(),

    var userName: String,

    @Column(unique = true)
    var email: String,

    var password: String,

    var birthDate: Date,

)