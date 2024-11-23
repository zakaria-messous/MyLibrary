import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Service utilisateur
import { User } from '../../models/user.model'; // Modèle utilisateur
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { MyBooksComponent } from '../mybooks/mybooks.component';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import des modules pour les formulaires réactifs

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [NavComponent, CommonModule, ReactiveFormsModule,MyBooksComponent], // Ajout de ReactiveFormsModule
})
export class ProfileComponent implements OnInit {
  user: User | null = null; // Données utilisateur
  loading: boolean = true; // Indicateur de chargement
  profileForm!: FormGroup; // Formulaire réactif

  constructor(private userService: UserService, private fb: FormBuilder) {} // Injection du FormBuilder

  ngOnInit(): void {
    // Chargement du profil utilisateur
    this.userService.getUserProfile().subscribe(
      (data) => {
        this.user = data;
        this.loading = false;
        this.initializeForm(); // Initialiser le formulaire une fois les données chargées
      },
      (error) => {
        console.error('Erreur lors du chargement du profil utilisateur', error);
        this.loading = false;
      }
    );
  }

  // Initialiser le formulaire avec les données utilisateur
  initializeForm(): void {
    if (this.user) {
      this.profileForm = this.fb.group({
        fullName: [this.user.fullName, Validators.required],
        role: [this.user.role, Validators.required],
        email: [{ value: this.user.email, disabled: true }, [Validators.required, Validators.email]], // Lecture seule
      });
    }
  }

  // Fonction pour gérer la soumission du formulaire
  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.getRawValue(); // Obtenir les données, y compris les champs désactivés
      console.log('Données mises à jour:', updatedData);
      alert('Profil mis à jour avec succès !');
      // Logique pour envoyer les modifications au backend via `UserService`
    } else {
      alert('Veuillez corriger les erreurs dans le formulaire.');
    }
  }

  // Gestion de la photo de profil
  onUpload(): void {
    alert('Fonction de téléchargement de photo en cours de développement...');
  }
}
