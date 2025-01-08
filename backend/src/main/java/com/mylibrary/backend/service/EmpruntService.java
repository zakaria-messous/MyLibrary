package com.mylibrary.backend.service;

import com.mylibrary.backend.entitie.Emprunt;
import com.mylibrary.backend.entitie.User;
import com.mylibrary.backend.repository.EmpruntRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpruntService {

    private final EmpruntRepository empruntRepository;
    private final UserService userService;

    @Autowired
    public EmpruntService(EmpruntRepository empruntRepository, UserService userService) {
        this.empruntRepository = empruntRepository;
        this.userService = userService;
    }

    // Create or update an Emprunt
    public Emprunt saveEmprunt(Emprunt emprunt) {
        return empruntRepository.save(emprunt);
    }

    // Get a specific Emprunt by its ID
    public Optional<Emprunt> getEmpruntById(Long id) {
        return empruntRepository.findById(id);
    }

    public List<Emprunt> getEmpruntByUser() {
        User user = (User) userService.getCurrentUserDetails();

        return empruntRepository.findEmpruntByUser(user);
    }

    // Get all Emprunts
    public List<Emprunt> getAllEmprunts() {
        return empruntRepository.findAll();
    }

    // Delete an Emprunt by its ID
    public void deleteEmprunt(Long id) {
        empruntRepository.deleteById(id);
    }

    // Update the status of an Emprunt
    public Emprunt updateStatus(Long id, String status) {
        Optional<Emprunt> emprunt = empruntRepository.findById(id);
        if (emprunt.isPresent()) {
            Emprunt updatedEmprunt = emprunt.get();
            updatedEmprunt.setStatus(status);
            return empruntRepository.save(updatedEmprunt);
        }
        return null; // If Emprunt not found, return null
    }
}
