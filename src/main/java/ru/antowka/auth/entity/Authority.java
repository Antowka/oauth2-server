package ru.antowka.auth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity(name = "authorities")
public class Authority {

    @Id
    @GeneratedValue
    private Long id;

    @JsonIgnore
    private String authority;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "authorities")
    private List<User> users;
}
