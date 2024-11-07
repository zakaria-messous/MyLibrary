package com.mylibrary.backend.repository;

import com.mylibrary.backend.entitie.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
