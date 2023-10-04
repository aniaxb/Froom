package com.froom.backend.items.model.domain;

import com.froom.backend.user.model.domain.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.UUID;
@Entity
@Setter
@Getter
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;


    private Type type;

    @ManyToOne
    @JoinColumn(name = "outfit_id")
    private Outfit outfit;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
