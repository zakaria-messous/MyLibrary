import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone: true,
  imports: [NgIf]

})
export class NavComponent {
  isProfileMenuOpen = false; // Pour savoir si le menu est ouvert ou fermé
  constructor(private router: Router) {}
  goToRegister() {
    this.router.navigate(['/register']);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToMYbook() {
    this.router.navigate(['/mybooks']);
  }
  goToHome() {
    this.router.navigate(['']);
  }
  // Ouvre ou ferme le menu du profil
  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }
  searchBooks(event: Event) {
    const input = event.target as HTMLInputElement; // assertion de type
    const query = input.value; // récupération de la valeur du champ input
    console.log('Recherche pour : ', query);
    // Ajoutez votre logique de recherche ici
  }
  
  
  // Action pour voir le profil
  viewProfile() {
    this.router.navigate(['/profile']);
    // Rediriger vers la page de profil ou afficher les informations
  }

  // Action pour se déconnecter
  logout() {
    console.log("Logging out...");
    // Implémentez la logique de déconnexion ici, comme vider les tokens, rediriger vers la page de login, etc.
  }
}
