import { Component, Inject } from '@angular/core';
import { Livre } from '../../models/livre';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  standalone: true,
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public livre: Livre,
    public dialogRef: MatDialogRef<BookDetailsComponent>, // Change 'private' to 'public'
    private router: Router
  ) {}

  addToCart(): void {
    console.log(`Livre ajouté au panier : ${this.livre.titre}`);
    this.dialogRef.close();
    this.router.navigate(['/confirmation'], { queryParams: { livre: JSON.stringify(this.livre) } });
  }
}
