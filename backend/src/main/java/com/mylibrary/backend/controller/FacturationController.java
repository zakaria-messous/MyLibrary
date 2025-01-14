package com.mylibrary.backend.controller;

import com.mylibrary.backend.entitie.Facturation;
import com.mylibrary.backend.entitie.Facturation.TransactionType;
import com.mylibrary.backend.service.FacturationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/facturation")
@PreAuthorize("hasAnyRole('ADMIN','SUPERADMIN')") // Restrict access to Admins and Super Admins
public class FacturationController {

    @Autowired
    private FacturationService facturationService;

    // Get all transactions or filter by type
    @GetMapping
    public List<Facturation> getAllTransactions(@RequestParam(required = false) String type) {
        if (type == null || type.equalsIgnoreCase("ALL")) {
            return facturationService.getAllTransactions();
        }
        return facturationService.getTransactionsByType(TransactionType.valueOf(type.toUpperCase()));
    }

    // Delete a transaction by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable Long id) {
        facturationService.deleteTransaction(id);
        return ResponseEntity.ok("Transaction supprimée avec succès !");
    }
}
