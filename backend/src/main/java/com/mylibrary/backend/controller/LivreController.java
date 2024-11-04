package com.mylibrary.backend.controller;

// LivreController.java
import com.mylibrary.backend.entitie.Livre;
import com.mylibrary.backend.service.LivreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    public Livre getLivreById(@PathVariable int id) {
        return livreService.getLivreById(id);
    }

    @PostMapping
    public Livre createLivre(@RequestBody Livre livre) {
        return livreService.saveLivre(livre);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livre> updateLivre(@PathVariable int id, @RequestBody Livre updatedLivre) {
        return livreService.updateLivre(id, updatedLivre)
                .map(livre -> ResponseEntity.ok(livre))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void deleteLivre(@PathVariable int id) {
        livreService.deleteLivre(id);
    }
}
