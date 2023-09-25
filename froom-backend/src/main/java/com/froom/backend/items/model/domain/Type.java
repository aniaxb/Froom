package com.froom.backend.items.model.domain;

public enum Type {

    T_SHIRT("t-shirt", BodyPart.TOP);

    private String name;
    private BodyPart bodyPart;

    Type(String name, BodyPart bodyPart) {
        this.name = name;
        this.bodyPart = bodyPart;
    }
}
