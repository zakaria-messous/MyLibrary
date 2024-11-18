import { Component, Inject, Input } from '@angular/core';
import { Livre } from '../../models/livre';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-book-details',
  standalone: true,
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  imports: [CommonModule]

})
export class BookDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public livre: Livre) {}

  addToCart() {
    console.log(`Livre ajouté au panier : ${this.livre.titre}`);
  }
}