package ru.antowka.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.antowka.auth.entity.User;
import ru.antowka.auth.service.UserService;

import javax.validation.Valid;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * User registration
     *
     * @param user
     * @return
     */
    @RequestMapping(value = "/api/users/signup", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity signup(@Valid @RequestBody User user){

        user = userService.createNewUser(user);

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

}
