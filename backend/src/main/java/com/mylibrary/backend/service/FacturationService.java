package com.mylibrary.backend.service;

import com.mylibrary.backend.entitie.Facturation;
import com.mylibrary.backend.entitie.User;
import com.mylibrary.backend.repository.FacturationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacturationService {

    @Autowired
    private FacturationRepository facturationRepository;
    @Autowired
    private UserService userService;

    public List<Facturation> getAllFacturations() {
        return facturationRepository.findAll();
    }

    public List<Facturation> getMyFacturation() {
        User user = (User) userService.getCurrentUserDetails();
        return facturationRepository.getFacturationsByUser(user);
    }
}
