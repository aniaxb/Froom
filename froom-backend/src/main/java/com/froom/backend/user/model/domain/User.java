package com.froom.backend.user.model.domain;

import com.froom.backend.items.model.domain.Item;
import com.froom.backend.items.model.domain.Outfit;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;



    private List<Item> wardrobe;

    private List<Outfit> outfits;



//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
}
