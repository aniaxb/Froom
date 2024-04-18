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
    var category: Category,

    @Enumerated(EnumType.STRING)
    var bodyPart: BodyPart,

    @ElementCollection
    @CollectionTable(name = "item_color", joinColumns = [JoinColumn(name = "item_id")])
    @Column(name = "color")
    var color: List<String>,

    @Lob
    var image: ByteArray,

    var imageFormat: String,

    @ManyToMany(mappedBy = "items")
    val outfits: MutableList<Outfit> = mutableListOf(),

    @ManyToOne
    @JoinColumn(name = "user_id")
    val user: User

)