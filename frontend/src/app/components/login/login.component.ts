import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit(event: Event) {
    event.preventDefault(); // Empêche le rechargement ou la soumission par défaut
    this.goToShop();
  }

  goToShop() {
    const validEmail = 'meriame@gmail.com';
    const validPassword = 'M1234567';

    console.log('Email:', this.email); // Vérifiez si l'email est correctement récupéré
    console.log('Password:', this.password); // Vérifiez si le mot de passe est correctement récupéré

    if (this.email === validEmail && this.password === validPassword) {
      this.router.navigate(['/bookshop']); // Redirige vers la page bookshop
    } else {
      this.showErrorAlert();
    }
  }
   showErrorAlert() {
    this.snackBar.open('Email ou mot de passe incorrect', 'Fermer', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}
