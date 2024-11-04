package com.mylibrary.backend.controller;

// CategorieController.java
import com.mylibrary.backend.entitie.Categorie;
import com.mylibrary.backend.service.CategorieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/categorie")
public class CategorieController {
    private final CategorieService categorieService;

    public CategorieController(CategorieService categorieService) {
        this.categorieService = categorieService;
    }

    @GetMapping
    public List<Categorie> getAllCategories() {
        return categorieService.getAllCategories();
    }

    @GetMapping("/{id}")
    public Categorie getCategorieById(@PathVariable int id) {
        return categorieService.getCategorieById(id);
    }

    @PostMapping
    public Categorie createCategorie(@RequestBody Categorie categorie) {
        return categorieService.saveCategorie(categorie);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categorie> updateCategorie(@PathVariable int id, @RequestBody Categorie updatedCategorie) {
        return categorieService.updateCategorie(id, updatedCategorie)
                .map(categorie -> ResponseEntity.ok(categorie))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void deleteCategorie(@PathVariable int id) {
        categorieService.deleteCategorie(id);
    }
}