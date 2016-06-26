package ru.antowka.auth.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity(name = "authorities")
public class Authority {

    @Id
    @GeneratedValue
    private Long id;

    private String authority;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "authorities")
    private List<User> users;
}
