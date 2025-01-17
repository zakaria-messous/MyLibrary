import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from '../book/book.component';
import { NavComponent } from '../nav/nav.component';
import { MatDialog } from '@angular/material/dialog';
import { OnInit } from '@angular/core';
import { Livre } from '../../models/livre';
import { ProductService } from '../../services/productService';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [BookDetailsComponent,NavComponent,BookComponent,CommonModule]
})
export class HomeComponent implements OnInit {
  livres: Livre[] = [];

  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit() {
    this.productService.getLivres().then((data) => (this.livres = data));
  }

  onLivreClick(livre: Livre) {
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
}
}
