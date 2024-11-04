package com.mylibrary.backend.controller;

import com.mylibrary.backend.entitie.User;
import com.mylibrary.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public UserDetails getMe() {
        return userService.getCurrentUserDetails();
    }
}
