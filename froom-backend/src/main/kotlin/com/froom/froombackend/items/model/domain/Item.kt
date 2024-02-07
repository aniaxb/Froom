package com.froom.froombackend.items.model.domain

import com.froom.froombackend.user.model.domain.User
import jakarta.persistence.*
import org.hibernate.annotations.GenericGenerator
import java.util.*

@Entity
class Item (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Int?,

    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    val uuid: UUID = UUID.randomUUID(),

    @Enumerated(EnumType.STRING)
    val category: Category,

    @ElementCollection
    @CollectionTable(name = "item_color", joinColumns = [JoinColumn(name = "item_id")])
    @Column(name = "color")
    val color: List<Int>,

    @Lob
    val image: ByteArray,

    val imageFormat: String,

    @ManyToMany(mappedBy = "items")
    val outfits: MutableList<Outfit> = mutableListOf(),

    @ManyToOne
    @JoinColumn(name = "user_id")
    val user: User

)