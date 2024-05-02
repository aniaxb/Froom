package com.froom.froombackend.items.model.domain

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonValue

enum class Category(name: String, val bodyPart: BodyPart, val index: Int) {
    TSHIRT("TShirt", BodyPart.TOP, 0),
    TROUSERS("Trousers", BodyPart.BOTTOM, 1),
    PULLOVER("Pullover", BodyPart.TOP, 2),
    DRESS("Dress", BodyPart.TOP, 3),
    COAT("Coat", BodyPart.TOP, 4),
    SANDALS("Sandals", BodyPart.SHOES, 5),
    SHIRT("Shirt", BodyPart.TOP, 6),
    SNEAKERS("Sneakers", BodyPart.SHOES, 7),
    BAG("Bag", BodyPart.ACCESSORY, 8),
    ANKLE_BOOTS("Ankle Boots", BodyPart.SHOES, 9),
    UNKNOWN("Unknown", BodyPart.UNKNOWN, -1);

    @JsonValue
    fun toJson(): String {
        return name
    }

    companion object {
        @JsonCreator
        @JvmStatic
        fun fromJson(name: String): Category {
            return entries.find { it.name.equals(name, ignoreCase = true) } ?: throw IllegalArgumentException("Unknown category: $name")
        }
    }

}