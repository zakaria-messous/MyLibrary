package com.mylibrary.backend.service;

import com.mylibrary.backend.entitie.*;
import com.mylibrary.backend.exceptions.BookNotAvailableException;
import com.mylibrary.backend.repository.*;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class LivreServiceTest {

    @Autowired
    private LivreService livreService;

    @MockBean
    private LivreRepository livreRepository;

    @MockBean
    private FacturationRepository facturationRepository;

    @MockBean
    private EmpruntRepository empruntRepository;

    @MockBean
    private NotificationRepository notificationRepository;

    @MockBean
    private UserService userService;

    // Test for successfully renting a book
    @Test
    public void testRentBookSuccess() {
        Long bookId = 1L;
        Livre livre = new Livre();
        livre.setId(bookId);
        livre.setTitre("Test Book");
        livre.setNombreCopieDispo(2);
        livre.setPrix(10.0F);

        User user = new User();
        user.setId(1L);
        user.setFullName("John Doe");
        user.setEmail("john.doe@example.com");

        Date returnDate = new Date();

        when(livreRepository.findById(bookId)).thenReturn(Optional.of(livre));
        when(userService.getCurrentUserDetails()).thenReturn(user);

        Emprunt emprunt = new Emprunt();
        emprunt.setId(1L);

        when(empruntRepository.save(Mockito.any(Emprunt.class))).thenReturn(emprunt);

        Emprunt result = livreService.rentBook(bookId, returnDate);

        assertNotNull(result);
        assertEquals(user, result.getUser());
        assertEquals(livre, result.getLivre());
        assertEquals("borrowed", result.getStatus());

        verify(facturationRepository, times(1)).save(Mockito.any(Facturation.class));
        verify(notificationRepository, times(1)).save(Mockito.any(Notification.class));
        assertEquals(1, livre.getNombreCopieDispo());
    }

    // Test for renting a book when it is not available
    @Test
    public void testRentBookNotAvailable() {
        Long bookId = 1L;
        Livre livre = new Livre();
        livre.setId(bookId);
        livre.setTitre("Test Book");
        livre.setNombreCopieDispo(0);

        when(livreRepository.findById(bookId)).thenReturn(Optional.of(livre));

        assertThrows(BookNotAvailableException.class, () -> livreService.rentBook(bookId, new Date()));

        verify(facturationRepository, never()).save(Mockito.any(Facturation.class));
        verify(empruntRepository, never()).save(Mockito.any(Emprunt.class));
        verify(notificationRepository, never()).save(Mockito.any(Notification.class));
    }

    // Test for renting a book when the book doesn't exist
    @Test
    public void testRentBookNotFound() {
        Long bookId = 1L;

        when(livreRepository.findById(bookId)).thenReturn(Optional.empty());

        assertThrows(BookNotAvailableException.class, () -> livreService.rentBook(bookId, new Date()));

        verify(facturationRepository, never()).save(Mockito.any(Facturation.class));
        verify(empruntRepository, never()).save(Mockito.any(Emprunt.class));
        verify(notificationRepository, never()).save(Mockito.any(Notification.class));
    }
}