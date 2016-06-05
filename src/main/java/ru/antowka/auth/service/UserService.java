package ru.antowka.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.antowka.auth.entity.Authority;
import ru.antowka.auth.entity.User;
import ru.antowka.auth.repository.AuthorityRepository;
import ru.antowka.auth.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Method create new user
     *
     * @param user
     * @return
     */
    public User createNewUser(User user) {

        String encodePassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodePassword);

        //Create user authorities
        List<Authority> authorities = new ArrayList<>();
        Authority authority = new Authority();
        authority.setId(2L);
        authorities.add(authority);
        user.setAuthorities(authorities);

        return userRepository.saveAndFlush(user);
    }
}
