import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Livre } from '../../models/livre';
import { ProductService } from '../../services/productService';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { CommonModule } from '@angular/common';
import { BookComponent } from '../book/book.component';
import { NavComponent } from '../nav/nav.component';
import { FormsModule } from '@angular/forms'; // Importer FormsModule ici

@Component({
  selector: 'app-bookshop',
  standalone: true,
  imports: [
    MatDialogModule,
    BookDetailsComponent,
    NavComponent,
    BookComponent,
    CommonModule,
    FormsModule, // Ajouter FormsModule ici pour résoudre l'erreur de ngModel
  ],
  templateUrl: './bookshop.component.html',
  styleUrls: ['./bookshop.component.css'],
})
export class BookshopComponent implements OnInit {
  livres: Livre[] = [];
  categories: string[] = ['All', 'Programming', 'Artificial Intelligence', 'Databases', 'Fiction', 'Classics'];
  selectedCategory: string = 'All';

  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.productService.getLivres().then((data: Livre[]) => {
      this.livres = data;
    });
  }

  getFilteredBooks(): Livre[] {
    if (this.selectedCategory === 'All') {
      return this.livres;
    }
    return this.livres.filter(livre => livre.categorie === this.selectedCategory);
  }

  openBookDetails (livre: Livre) {
    if (livre.disponibilite) {
      // Ouvrir les détails du livre uniquement si il est disponible
      console.log('Ouvrir les détails du livre:', livre.titre);
      this.dialog.open(BookDetailsComponent, {
        width: '600px',
        data: livre,
      });
    } else {
      console.log('Ce livre est en rupture de stock');
      // Vous pouvez également afficher un message d'alerte ou rediriger l'utilisateur.
    }
}}
