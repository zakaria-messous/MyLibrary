import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone: true,
  imports: [NgIf]

})
export class NavComponent {
  isProfileMenuOpen = false; // Pour savoir si le menu est ouvert ou fermé

  // Ouvre ou ferme le menu du profil
  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  // Action pour voir le profil
  viewProfile() {
    console.log("Viewing profile...");
    // Rediriger vers la page de profil ou afficher les informations
  }

  // Action pour se déconnecter
  logout() {
    console.log("Logging out...");
    // Implémentez la logique de déconnexion ici, comme vider les tokens, rediriger vers la page de login, etc.
  }
}
