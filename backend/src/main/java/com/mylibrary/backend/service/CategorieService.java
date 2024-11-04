package com.mylibrary.backend.service;

// CategorieService.java
import com.mylibrary.backend.entitie.Categorie;
import com.mylibrary.backend.repository.CategorieRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CategorieService {
    private final CategorieRepository categorieRepository;

    public CategorieService(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }

    public Categorie getCategorieById(int id) {
        return categorieRepository.findById(id).orElse(null);
    }

    public Categorie saveCategorie(Categorie categorie) {
        return categorieRepository.save(categorie);
    }

    public Optional<Categorie> updateCategorie(int id, Categorie updatedCategorie) {
        return categorieRepository.findById(id).map(categorie -> {
            categorie.setNomCategorie(updatedCategorie.getNomCategorie());
            return categorieRepository.save(categorie);
        });
    }

    public void deleteCategorie(int id) {
        categorieRepository.deleteById(id);
    }
}