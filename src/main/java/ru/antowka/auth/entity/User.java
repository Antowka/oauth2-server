package ru.antowka.auth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.persistence.GeneratedValue;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private Long id;

    private String password;

    @NotNull
    @Length(min = 4, message = "The field must be at least 2 characters")
    private String username;

    @NotNull
    @Length(min = 6, message = "The field must be at least 5 characters")
    private String email;

    private String firstName;

    private String lastName;

    private Date birthday;

    private boolean enabled = true;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
        name = "users_authorities",
        joinColumns = {
            @JoinColumn(name = "users_id", referencedColumnName="id"),
        },
        inverseJoinColumns = {
            @JoinColumn(name = "authorities_id", referencedColumnName="id")
        }
    )
    private List<Authority> authorities;

    private Date date = new Date();

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    @JsonIgnore
    public void setDate(Date date){
        this.date = date;
    }
}
