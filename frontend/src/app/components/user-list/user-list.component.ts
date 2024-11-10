import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { FormsModule } from '@angular/forms';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, SidenavComponent, NavComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  // Initialisation des utilisateurs avec des données statiques
  users = [
    { id: 1, name: 'Alice Doe', email: 'alice@example.com', returnDate: '2024-11-15', booksBorrowed: 3 },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', returnDate: '2024-11-20', booksBorrowed: 5 },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', returnDate: '2024-11-25', booksBorrowed: 2 }
  ];

  // Variables pour gérer l'ajout et la modification d'un utilisateur
  newUser: any = null; // Formulaire d'ajout
  userEnCours: any = null; // Formulaire de modification

  // Méthode pour supprimer un utilisateur
  deleteUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
    console.log(`Utilisateur avec l'ID ${userId} supprimé.`);
  }

  // Afficher le formulaire d'ajout d'utilisateur
  addUser() {
    this.newUser = { name: '', email: '', booksBorrowed: 0, returnDate: '' };
    this.userEnCours = null; // Cacher le formulaire de modification
  }

  // Afficher le formulaire de modification d'un utilisateur
  editUser(userId: number) {
    this.newUser = null; // Cacher le formulaire d'ajout
    this.userEnCours = this.users.find(user => user.id === userId);
  }

  // Sauvegarder le nouvel utilisateur
  saveNewUser() {
    this.users.push({ ...this.newUser, id: this.users.length + 1 });
    this.newUser = null; // Cacher le formulaire d'ajout
  }

  // Sauvegarder les changements de l'utilisateur modifié
  saveUserChanges() {
    const index = this.users.findIndex(user => user.id === this.userEnCours.id);
    if (index !== -1) {
      this.users[index] = { ...this.userEnCours };
    }
    this.userEnCours = null; // Cacher le formulaire de modification
  }

  // Annuler l'ajout d'un utilisateur
  cancelAdd() {
    this.newUser = null; // Cacher le formulaire d'ajout
  }

  // Annuler la modification d'un utilisateur
  cancelEdit() {
    this.userEnCours = null; // Cacher le formulaire de modification
  }
}
 // V1