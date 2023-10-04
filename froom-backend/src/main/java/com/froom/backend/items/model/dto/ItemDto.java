package com.froom.backend.items.model.dto;

import com.froom.backend.items.model.domain.BodyPart;
import com.froom.backend.items.model.domain.Type;
import lombok.Getter;
import lombok.Setter;
import java.util.UUID;

@Getter
@Setter
public class ItemDto {
    private UUID id;
    private Type type;
    private String color;
    private Double price;
    private BodyPart bodyPart;
    private String size;
}
