package com.mylibrary.backend.repository;
import com.mylibrary.backend.entitie.Livre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivreRepository extends JpaRepository<Livre, Integer> {}
