package com.mylibrary.backend.controller.Admin;

import org.springframework.security.access.prepost.PreAuthorize;
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

    @GetMapping("/admin/categories")
    public String categoriesPage() {
        return "categories"; // Refers to templates/category.html
    }

    @GetMapping("/admin/users")
    public String usersPage() {
        return "users"; // Refers to templates/users.html
    }

    @GetMapping("/admin/facturations")
    public String facturationsPage() {
        return "facturations"; // Refers to templates/facturations.html
    }

    @GetMapping("/admin/emprunts")
    public String empruntsPage() {
        return "emprunts"; // Refers to templates/emprunts.html
    }
}
