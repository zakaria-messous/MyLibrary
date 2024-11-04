package com.mylibrary.backend.dtos;

import com.mylibrary.backend.entitie.Role;
import lombok.Data;

@Data
public class RegisterUserDto {
    private String email;

    private String password;

    private String fullName;

    private Role role;

}
