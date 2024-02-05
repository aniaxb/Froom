package com.froom.froombackend.items.model.domain

enum class Category(name: String, bodyPart: BodyPart, index: Int) {
    T_SHIRT_TOP("T-Shirt/Top", BodyPart.TOP, 0),
    TROUSERS("Trousers", BodyPart.BOTTOM, 1),
    PULLOVER("Pullover", BodyPart.TOP, 2),
    DRESS("Dress", BodyPart.TOP, 3),
    COAT("Coat", BodyPart.TOP, 4),
    SANDALS("Sandals", BodyPart.SHOES, 5),
    SHIRT("Shirt", BodyPart.TOP, 6),
    SNEAKERS("Sneakers", BodyPart.SHOES, 7),
    BAG("Bag", BodyPart.ACCESSORY, 8),
    ANKLE_BOOTS("Ankle Boots", BodyPart.SHOES, 9),
    UNKNOWN("Unknown", BodyPart.UNKNOWN, -1)
}