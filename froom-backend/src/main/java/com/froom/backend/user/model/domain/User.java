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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Item> wardrobe;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Outfit> outfits;

    private String firstName;
    private String lastName;
    private String email;
    private String password;

}
