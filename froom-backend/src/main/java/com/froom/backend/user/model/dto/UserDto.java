package com.froom.backend.user.model.dto;

import com.froom.backend.items.model.domain.Item;
import com.froom.backend.items.model.domain.Outfit;
import lombok.Getter;
import lombok.Setter;
import java.util.List;
import java.util.UUID;
@Getter
@Setter
public class UserDto {
    private UUID id;
    private List<Item> wardrobe;
    private List<Outfit> outfits;
}
