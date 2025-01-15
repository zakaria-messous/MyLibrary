package com.mylibrary.backend.controller;

import com.mylibrary.backend.entitie.Facturation;
import com.mylibrary.backend.service.FacturationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/facturation")
public class FacturationController {
    @Autowired
    private FacturationService facturationService;

    @GetMapping
    public List<Facturation> getAllFacturations() {
        return facturationService.getAllFacturations();
    }
    @GetMapping("/my")
    public List<Facturation> getMyFacturations() {
        return facturationService.getMyFacturation();
    }
}
