package com.mylibrary.backend.controller;

import com.mylibrary.backend.entitie.User;
import com.mylibrary.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/createuser")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(adminService.createUser(user));
    }

    @PutMapping("/updateuser/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        return ResponseEntity.ok(adminService.updateUser(id, user));
    }

    @DeleteMapping("/deleteuser/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok("Utilisateur supprimé avec succès !");
    }

}
