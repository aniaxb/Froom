package com.froom.froombackend.items.model.domain

import jakarta.persistence.*

@Entity
class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    val id: Long? = null

}