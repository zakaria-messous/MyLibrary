import { Component, Inject, Input } from '@angular/core';
import { Livre } from '../../models/livre';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-book-details',
  standalone: true,
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  imports: [CommonModule]

})
export class BookDetailsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public livre: Livre,
    private router: Router ,// Injection du Router pour la navigation
    private dialogRef: MatDialogRef<BookDetailsComponent>  // Injection de MatDialogRef

  ) {}

  addToCart(): void {
    this.dialogRef.close();
    // Optionnel : Logique pour ajouter au panier
    console.log(`Livre ajouté au panier : ${this.livre.titre}`);

    // Redirection vers la page de confirmation de commande
    this.router.navigate(['/confirmation'], { queryParams: { livre: JSON.stringify(this.livre) } });
  }
}