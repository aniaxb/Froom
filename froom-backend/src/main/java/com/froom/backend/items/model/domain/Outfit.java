package com.froom.backend.items.model.domain;

import com.froom.backend.user.model.domain.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Entity
public class Outfit {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToMany(mappedBy = "outfit", cascade = CascadeType.ALL)
    private List<Item> items;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
