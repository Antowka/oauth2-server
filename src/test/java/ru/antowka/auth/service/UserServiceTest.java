package ru.antowka.auth.service;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.*;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import ru.antowka.auth.entity.User;
import ru.antowka.auth.entity.Authority;
import ru.antowka.auth.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {

    private User sampleUser;

    private String password = "123123";

    @InjectMocks
    private UserService userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserRepository userRepository;

    @Captor
    private ArgumentCaptor<User> argumentCaptorUser;

    @Before
    public void setUp() throws Exception {

        sampleUser = new User();
        sampleUser.setId(1L);
        sampleUser.setPassword(password);
        sampleUser.setEmail("662307@gmail.com");
    }

    @Test
    public void createNewUser() throws Exception {

        Mockito.when(passwordEncoder.encode(sampleUser.getPassword()))
                .thenReturn(new BCryptPasswordEncoder().encode(sampleUser.getPassword()));

        Mockito.when(userRepository.saveAndFlush(sampleUser)).thenReturn(sampleUser);

        userService.createNewUser(sampleUser);

        Mockito.verify(userRepository).saveAndFlush(argumentCaptorUser.capture());
        User user = argumentCaptorUser.getValue();

        assertNotEquals(password, user.getPassword());
    }
}