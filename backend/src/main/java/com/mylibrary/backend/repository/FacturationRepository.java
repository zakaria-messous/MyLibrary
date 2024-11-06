package com.mylibrary.backend.repository;

import com.mylibrary.backend.entitie.Facturation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacturationRepository extends JpaRepository<Facturation, Long> {

}
