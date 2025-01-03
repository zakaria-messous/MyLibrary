package com.mylibrary.backend.controller;

// LivreController.java
import com.mylibrary.backend.entitie.Emprunt;
import com.mylibrary.backend.entitie.Facturation;
import com.mylibrary.backend.entitie.Livre;
import com.mylibrary.backend.service.LivreService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/livre")
public class LivreController {
    private final LivreService livreService;

    public LivreController(LivreService livreService) {
        this.livreService = livreService;
    }

    @GetMapping
    public List<Livre> getAllLivres() {
        return livreService.getAllLivres();
    }

    @GetMapping("/{id}")
    public Livre getLivreById(@PathVariable Long id) {
        return livreService.getLivreById(id);
    }

    @PreAuthorize( "hasAnyRole('ADMIN','SUPERADMIN')" )
    @PostMapping
    public Livre createLivre(@RequestBody Livre livre) {
        return livreService.saveLivre(livre);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livre> updateLivre(@PathVariable Long id, @RequestBody Livre updatedLivre) {
        return livreService.updateLivre(id, updatedLivre)
                .map(livre -> ResponseEntity.ok(livre))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/buy/{id}")
    public Facturation buyLivre(@PathVariable Long id) {
        return livreService.buyBook(id);
    }

    @PostMapping("/rent")
    public Emprunt rentLivre(
            @RequestParam Long id,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return livreService.rentBook(id, date);
    }

    @GetMapping("/rents/{userId}")
    public List<Emprunt> getRentsByUserId(@PathVariable Long userId) {
        return livreService.getRentsByUserId(userId);
    }

    @DeleteMapping("/{id}")
    public void deleteLivre(@PathVariable Long id) {
        livreService.deleteLivre(id);
    }
}
