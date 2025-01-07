package com.mylibrary.backend.entitie;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Table(name = "livres")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Livre{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private String auteur;
    private String description;
    private boolean disponibilite;
    private int nombreCopieDispo;
    private float prix;

    @OneToMany(mappedBy = "livre", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Facturation> facturations;


    @ManyToOne
    @JoinColumn(name = "categorie_id")
    private Categorie categorie;

    @Column(name = "image_url")
    private String imageUrl;

    // Getters and Setters
}