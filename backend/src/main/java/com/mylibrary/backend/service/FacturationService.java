package com.mylibrary.backend.service;

import com.mylibrary.backend.entitie.Facturation;
import com.mylibrary.backend.entitie.Facturation.TransactionType;
import com.mylibrary.backend.entitie.User;
import com.mylibrary.backend.repository.FacturationRepository;
import com.mylibrary.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacturationService {

    @Autowired
    UserService userService ;

    @Autowired
    private FacturationRepository facturationRepository;

    // Get all transactions
    public List<Facturation> getAllTransactions() {
        return facturationRepository.findAll();
    }

    public List<Facturation> getMyFacturations() {
        User user = (User) userService.getCurrentUserDetails();
        return facturationRepository.getFacturationsByUser(user);
    }

    // Get transactions by type
    public List<Facturation> getTransactionsByType(TransactionType type) {
        return facturationRepository.findByType(type);
    }

    // Delete a transaction by ID
    public void deleteTransaction(Long id) {
        facturationRepository.deleteById(id);
    }
}
