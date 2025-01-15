package com.mylibrary.backend.repository;

import com.mylibrary.backend.entitie.Facturation;
import com.mylibrary.backend.entitie.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacturationRepository extends JpaRepository<Facturation, Long> {
    List<Facturation> findByType(Facturation.TransactionType type);

    List<Facturation> getFacturationsByUser(User user);
}
