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
  admins = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'James Brown', email: 'james@example.com' }
  ];

  // Variable de recherche
  searchTerm: string = '';
  filteredAdmins = [...this.admins];

  adminEnCours: { id: number, name: string, email: string } | null = null;
  newAdmin: { name: string, email: string } | null = null;

  // Méthode pour filtrer les administrateurs en fonction du texte de recherche
  searchAdmin(): void {
    const search = this.searchTerm.toLowerCase();
    this.filteredAdmins = this.admins.filter(
      admin =>
        admin.name.toLowerCase().includes(search) || // Recherche par nom
        admin.email.toLowerCase().includes(search)   // Recherche par email
    );
  }

  // Méthode pour initialiser la modification d'un administrateur
  editAdmin(adminId: number): void {
    const admin = this.admins.find(a => a.id === adminId);
    if (admin) {
      this.adminEnCours = { ...admin };
      console.log(`Editing admin with ID ${adminId}`);
    }
  }

  // Méthode pour initialiser l'ajout d'un nouvel administrateur
  addAdmin(): void {
    this.newAdmin = { name: '', email: '' };
    this.adminEnCours = null;
    console.log('Adding a new admin');
  }

  // Méthode pour appliquer et enregistrer les modifications
  modifierAdmin(): void {
    if (this.adminEnCours) {
      const index = this.admins.findIndex(admin => admin.id === this.adminEnCours!.id);
      if (index !== -1) {
        this.admins[index] = { ...this.adminEnCours };
        console.log(`Admin with ID ${this.adminEnCours.id} modified.`);
        this.adminEnCours = null;
        this.searchAdmin(); // Mettre à jour la liste filtrée après modification
      }
    }
  }

  // Méthode pour ajouter un administrateur
  saveNewAdmin(): void {
    if (this.newAdmin) {
      const newAdmin = {
        id: this.admins.length + 1,
        name: this.newAdmin.name,
        email: this.newAdmin.email
      };
      this.admins.push(newAdmin);
      console.log(`Admin with ID ${newAdmin.id} added.`);
      this.newAdmin = null;
      this.searchAdmin(); // Mettre à jour la liste filtrée après ajout
    }
  }

  // Méthode pour annuler l'ajout
  cancelAdd(): void {
    this.newAdmin = null;
  }

  // Méthode pour annuler la modification
  annulerModification(): void {
    this.adminEnCours = null;
  }

  // Méthode pour supprimer un administrateur
  deleteAdmin(adminId: number): void {
    this.admins = this.admins.filter(admin => admin.id !== adminId);
    console.log(`Admin with ID ${adminId} deleted.`);
    this.searchAdmin(); // Mettre à jour la liste filtrée après suppression
  }
}
