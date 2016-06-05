package ru.antowka.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.antowka.auth.entity.User;


public interface UserRepository extends JpaRepository<User, Long> {
}
