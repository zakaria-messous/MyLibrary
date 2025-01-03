package com.mylibrary.backend.service;

// LivreService.java
import com.mylibrary.backend.entitie.*;
import com.mylibrary.backend.exceptions.BookNotAvailableException;
import com.mylibrary.backend.repository.*;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static com.mylibrary.backend.entitie.Facturation.TransactionType.PURCHASE;
import static com.mylibrary.backend.entitie.Facturation.TransactionType.RENT;

@Service
public class LivreService {
    @Autowired
    private LivreRepository livreRepository;
    @Autowired
    private CategorieRepository categorieRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private FacturationRepository facturationRepository;
    @Autowired
    private EmpruntRepository empruntRepository;
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private EmailNotificationService emailNotificationService;

    public LivreService(LivreRepository livreRepository) {
        this.livreRepository = livreRepository;
    }

    public List<Livre> getAllLivres() {
        return livreRepository.findAll();
    }

    public Livre getLivreById(Long id) {
        return livreRepository.findById(id).orElse(null);
    }

    public Optional<Livre> updateLivre(Long id, Livre updatedLivre) {
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

    public void deleteLivre(Long id) {
        livreRepository.deleteById(id);
    }

    public Facturation buyBook(Long id){
        Livre livre = livreRepository.findById(id).orElse(null);
        User user = (User) userService.getCurrentUserDetails();
        Facturation facturation = new Facturation();
        facturation.setUser(user);
        facturation.setLivre(livre);
        facturation.setType(PURCHASE);
        facturation.setPrix(livre.getPrix());

        return facturationRepository.save(facturation);
    }

    public Emprunt rentBook(Long id, Date date) {
        Livre livre = livreRepository.findById(id).orElse(null);
        User user = (User) userService.getCurrentUserDetails();

        if (livre == null || livre.getNombreCopieDispo() < 1) {
            throw new BookNotAvailableException("The book is not available right now.");
        }

        Facturation facturation = new Facturation();
        facturation.setUser(user);
        facturation.setLivre(livre);
        facturation.setType(RENT);
        facturation.setPrix(livre.getPrix());
        facturationRepository.save(facturation);

        Emprunt emprunt = new Emprunt();
        emprunt.setUser(user);
        emprunt.setLivre(livre);
        emprunt.setStatus("borrowed");
        emprunt.setDateRetour(date);
        livre.setNombreCopieDispo(livre.getNombreCopieDispo() - 1);

        // 1. Create Notification in Database
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setMessage("User " + user.getFullName() + " with the email " + user.getEmail() + " has rented the book: " + livre.getTitre());
        notificationRepository.save(notification);

        // 2. Send Email Notification (optional)
        String subject = "Book Rental Confirmation";
        String emailMessage = "Dear " + user.getFullName() + ",\n\nYou have rented the book: " + livre.getTitre();
        // emailNotificationService.sendNotification(user.getEmail(), subject, emailMessage);

        return empruntRepository.save(emprunt);
    }

    // New Method: Get All Rents by User ID
    public List<Emprunt> getRentsByUserId(Long userId) {
        return empruntRepository.findByUserId(userId);
    }

}
