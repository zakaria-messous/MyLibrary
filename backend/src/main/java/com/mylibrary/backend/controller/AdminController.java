package com.mylibrary.backend.controller;

import com.mylibrary.backend.entitie.User;
import com.mylibrary.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize( "hasAnyRole('ADMIN','SUPERADMIN')" )
public class AdminController {

    @Autowired
    private AdminService adminService;


    @GetMapping("/userlist")
    public List<User> get() {
        return adminService.getAllUsers();
    }

}
