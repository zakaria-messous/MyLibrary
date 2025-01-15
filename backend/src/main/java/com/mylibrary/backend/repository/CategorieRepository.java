package com.mylibrary.backend.repository;
import com.mylibrary.backend.entitie.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategorieRepository extends JpaRepository<Categorie, Integer> {
    Categorie findByNomCategorie(String nomCategorie);
}
