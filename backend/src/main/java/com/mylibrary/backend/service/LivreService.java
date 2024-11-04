package com.mylibrary.backend.service;

// LivreService.java
import com.mylibrary.backend.entitie.Livre;
import com.mylibrary.backend.repository.CategorieRepository;
import com.mylibrary.backend.repository.LivreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LivreService {
    @Autowired
    private LivreRepository livreRepository;
    @Autowired
    private CategorieRepository categorieRepository;

    public LivreService(LivreRepository livreRepository) {
        this.livreRepository = livreRepository;
    }

    public List<Livre> getAllLivres() {
        return livreRepository.findAll();
    }

    public Livre getLivreById(int id) {
        return livreRepository.findById(id).orElse(null);
    }

    public Optional<Livre> updateLivre(int id, Livre updatedLivre) {
        return livreRepository.findById(id).map(livre -> {
            livre.setTitre(updatedLivre.getTitre());
            livre.setAuteur(updatedLivre.getAuteur());
            livre.setDescription(updatedLivre.getDescription());
            livre.setDisponibilite(updatedLivre.isDisponibilite());
            livre.setPrix(updatedLivre.getPrix());

            // Update the category if a valid ID is provided
            if (updatedLivre.getCategorie() != null && updatedLivre.getCategorie().getId() != null) {
                categorieRepository.findById(updatedLivre.getCategorie().getId())
                        .ifPresent(livre::setCategorie);
            }

            return livreRepository.save(livre);
        });
    }

    public Livre saveLivre(Livre livre) {
        return livreRepository.save(livre);
    }

    public void deleteLivre(int id) {
        livreRepository.deleteById(id);
    }
}
