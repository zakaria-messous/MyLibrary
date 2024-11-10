import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router: Router) {}
  user = {
    fullName: '',
    email: '',
    password: ''
  };

  onRegister() {
    console.log('User registered:', this.user);
    // Ajoutez ici l'appel au service d'inscription pour envoyer les données au backend
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
