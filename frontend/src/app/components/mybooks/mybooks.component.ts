import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css'],
  standalone: true,
  imports: [CommonModule, NavComponent],
})
export class MyBooksComponent implements OnInit {
  @Input() showNavbar: boolean = true; 
  reservedBooks: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadReservedBooks();
  }

  // Charger les livres réservés depuis le localStorage
  loadReservedBooks(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const books = JSON.parse(localStorage.getItem('reservedBooks') || '[]');
      console.log('Books from localStorage:', books);
      if (Array.isArray(books)) {
        this.reservedBooks = books;
      }
    }
  }

  // Annuler la réservation d'un livre
  cancelReservation(index: number): void {
    this.reservedBooks.splice(index, 1); // Retirer le livre de la liste
    this.updateLocalStorage(); // Mettre à jour le localStorage
  }

  // Mettre à jour le localStorage après la suppression
  updateLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('reservedBooks', JSON.stringify(this.reservedBooks));
    }
  }
}
