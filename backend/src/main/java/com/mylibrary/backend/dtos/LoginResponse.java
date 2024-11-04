package com.mylibrary.backend.dtos;

import lombok.Data;
import lombok.Getter;

@Data
public class LoginResponse {
    @Getter
    private String token;

    private long expiresIn;

    // Getters and setters...
}
