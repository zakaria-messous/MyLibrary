import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { FormsModule } from '@angular/forms'; 
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, SidenavComponent, NavComponent],
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent {
  // Liste des administrateurs avec des informations statiques
  admins = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'James Brown', email: 'james@example.com' }
  ];

  // Propriétés pour l'ajout et la modification
  adminEnCours: { id: number, name: string, email: string } | null = null;
  newAdmin: { name: string, email: string } | null = null;
  
  // Propriété temporaire utilisée pour le binding ngModel
  adminForm: { name: string, email: string } = { name: '', email: '' };

  // Méthode pour initialiser la modification d'un administrateur
  editAdmin(adminId: number): void {
    const admin = this.admins.find(a => a.id === adminId);
    if (admin) {
      // Clonage de l'objet pour éviter la modification directe
      this.adminEnCours = { ...admin };
      this.adminForm = { ...admin };  // Charger les données dans le formulaire
      console.log(`Editing admin with ID ${adminId}`);
    }
  }

  // Méthode pour initialiser l'ajout d'un nouvel administrateur
  addAdmin(): void {
    this.newAdmin = { name: '', email: '' }; // Réinitialiser pour ajouter un nouvel administrateur
    this.adminEnCours = null; // Réinitialiser la modification si présente
    this.adminForm = { name: '', email: '' }; // Réinitialiser le formulaire
    console.log('Adding a new admin');
  }

  // Méthode pour appliquer et enregistrer les modifications
  modifierAdmin(): void {
    if (this.adminEnCours) {
      const index = this.admins.findIndex(admin => admin.id === this.adminEnCours!.id);
      if (index !== -1) {
        // Mettre à jour l'administrateur dans la liste
        this.admins[index] = { ...this.adminEnCours };
        console.log(`Admin with ID ${this.adminEnCours.id} modified.`);
        // Réinitialiser adminEnCours après modification
        this.adminEnCours = null;
        this.adminForm = { name: '', email: '' }; // Réinitialiser le formulaire
      }
    }
  }

  // Méthode pour ajouter un administrateur
  saveNewAdmin(): void {
    if (this.newAdmin) {
      const newAdmin = {
        id: this.admins.length + 1,  // Génération de l'ID
        name: this.newAdmin.name,
        email: this.newAdmin.email
      };
      this.admins.push(newAdmin); // Ajouter l'administrateur à la liste
      console.log(`Admin with ID ${newAdmin.id} added.`);
      // Réinitialiser le formulaire après ajout
      this.newAdmin = null;
      this.adminForm = { name: '', email: '' }; // Réinitialiser le formulaire
    }
  }

  // Méthode pour annuler l'ajout
  cancelAdd(): void {
    this.newAdmin = null;
    this.adminForm = { name: '', email: '' }; // Réinitialiser le formulaire
  }

  // Méthode pour annuler la modification et réinitialiser le formulaire
  annulerModification(): void {
    this.adminEnCours = null;
    this.adminForm = { name: '', email: '' }; // Réinitialiser le formulaire
  }

  // Méthode pour supprimer un administrateur de la liste
  deleteAdmin(adminId: number): void {
    this.admins = this.admins.filter(admin => admin.id !== adminId);
    console.log(`Admin with ID ${adminId} deleted.`);
  }
}
