package com.mylibrary.backend.service;

import com.mylibrary.backend.entitie.Categorie;
import com.mylibrary.backend.repository.CategorieRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class CategorieServiceTest {

    @Autowired
    private CategorieService categorieService;

    @MockBean
    private CategorieRepository categorieRepository;

    @Test
    void getAllCategories_ReturnsAllCategories() {
        // Arrange
        List<Categorie> mockCategories = new ArrayList<>();
        Categorie categorie1 = new Categorie();
        categorie1.setId(1);
        Categorie categorie2 = new Categorie();
        categorie2.setId(2);

        mockCategories.add(categorie1);
        mockCategories.add(categorie2);

        when(categorieRepository.findAll()).thenReturn(mockCategories);

        // Act
        List<Categorie> result = categorieService.getAllCategories();

        // Assert
        assertEquals(2, result.size());
        assertEquals(1, result.get(0).getId());
        assertEquals(2, result.get(1).getId());
    }

    @Test
    void getAllCategories_ReturnsEmptyList_WhenNoCategoriesExist() {
        // Arrange
        when(categorieRepository.findAll()).thenReturn(new ArrayList<>());

        // Act
        List<Categorie> result = categorieService.getAllCategories();

        // Assert
        assertEquals(0, result.size());
    }
}