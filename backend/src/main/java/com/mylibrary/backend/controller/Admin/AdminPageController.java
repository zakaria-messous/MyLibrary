package com.mylibrary.backend.controller.Admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminPageController {

    @GetMapping("/admin/livres")
    public String getLivres() {
        return "livres"; // Refers to templates/livres.html
    }

    @GetMapping("/admin/login")
    public String loginPage() {
        return "login"; // Refers to templates/login.html
    }
}
