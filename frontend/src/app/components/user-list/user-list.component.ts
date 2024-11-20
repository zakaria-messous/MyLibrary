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
  users = [
    { id: 1, name: 'Alice Doe', email: 'alice@example.com', returnDate: '2024-11-15', booksBorrowed: 3 },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', returnDate: '2024-11-20', booksBorrowed: 5 },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', returnDate: '2024-11-25', booksBorrowed: 2 }
  ];

  searchTerm: string = '';
  filteredUsers = [...this.users];

  newUser: any = null;
  userEnCours: any = null;

  searchUser(): void {
    const search = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(
      user =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.returnDate.includes(search)
    );
  }

  deleteUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
    this.searchUser();
  }

  addUser() {
    this.newUser = { name: '', email: '', booksBorrowed: 0, returnDate: '' };
    this.userEnCours = null;
  }

  editUser(userId: number) {
    this.newUser = null;
    this.userEnCours = this.users.find(user => user.id === userId);
  }

  saveNewUser() {
    this.users.push({ ...this.newUser, id: this.users.length + 1 });
    this.newUser = null;
    this.searchUser();
  }

  saveUserChanges() {
    const index = this.users.findIndex(user => user.id === this.userEnCours.id);
    if (index !== -1) {
      this.users[index] = { ...this.userEnCours };
    }
    this.userEnCours = null;
    this.searchUser();
  }

  cancelAdd() {
    this.newUser = null;
  }

  cancelEdit() {
    this.userEnCours = null;
  }
}
