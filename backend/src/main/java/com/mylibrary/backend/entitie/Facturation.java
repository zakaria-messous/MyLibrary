package com.mylibrary.backend.entitie;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name = "facturations")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Facturation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "livre_id", nullable = false)
    private Livre livre;

    @CreationTimestamp
    @Column(updatable = false, name = "date_transaction")
    private Date dateTransaction;

    @Column(nullable = false)
    private float prix;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType type;

    public enum TransactionType {
        PURCHASE, RENT
    }
}
