package com.mylibrary.backend.entitie;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Table(name = "categories")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Categorie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nomCategorie;

    @OneToMany(mappedBy = "categorie", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Livre> livres;

    // Getters and Setters
}