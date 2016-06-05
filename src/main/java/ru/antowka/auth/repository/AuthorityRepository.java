package ru.antowka.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.antowka.auth.entity.Authority;


public interface AuthorityRepository extends JpaRepository<Authority, Long> {

}
