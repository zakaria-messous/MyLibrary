package com.mylibrary.backend.controller;

import com.mylibrary.backend.entitie.Emprunt;
import com.mylibrary.backend.service.EmpruntService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/emprunts")
public class EmpruntController {

    private final EmpruntService empruntService;

    @Autowired
    public EmpruntController(EmpruntService empruntService) {
        this.empruntService = empruntService;
    }

    // Get all emprunts
    @GetMapping
    public List<Emprunt> getAllEmprunts() {
        return empruntService.getAllEmprunts();
    }

    // Get a specific emprunt by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Emprunt> getEmpruntById(@PathVariable Long id) {
        Optional<Emprunt> emprunt = empruntService.getEmpruntById(id);
        return emprunt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/me")
    public List<Emprunt> getEmpruntsOfCurrentUser() {
        return empruntService.getEmpruntByUser();
    }

    // Create or update an emprunt
    @PostMapping
    public Emprunt createEmprunt(@RequestBody Emprunt emprunt) {
        return empruntService.saveEmprunt(emprunt);
    }

    // Update status of an emprunt
    @PatchMapping("/{id}/status")
    public ResponseEntity<Emprunt> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Emprunt updatedEmprunt = empruntService.updateStatus(id, status);
        if (updatedEmprunt != null) {
            return ResponseEntity.ok(updatedEmprunt);
        }
        return ResponseEntity.notFound().build();
    }

    // Delete an emprunt by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmprunt(@PathVariable Long id) {
        Optional<Emprunt> emprunt = empruntService.getEmpruntById(id);
        if (emprunt.isPresent()) {
            empruntService.deleteEmprunt(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
