import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from '../book/book.component';
import { NavComponent } from '../nav/nav.component';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,NavComponent,BookComponent,BookDetailsComponent], // Importer CommonModule pour utiliser *ngFor
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  books = [
    {
      title: 'Les Misérables',
      author: 'Victor Hugo',
      description: 'Un roman classique de la littérature française.',
      image: '../../../assets/4.png'
    },
    {
      title: '1984',
      author: 'George Orwell',
      description: 'Un roman dystopique incontournable.',
      image: 'assets/images/1984.jpg'
    },
    {
      title: 'Le Petit Prince',
      author: 'Antoine de Saint-Exupéry',
      description: 'Un conte philosophique pour petits et grands.',
      image: 'assets/images/le-petit-prince.jpg'
    },
    {
      title: 'L\'Étranger',
      author: 'Albert Camus',
      description: 'Un roman existentialiste classique.',
      image: 'assets/images/l-etranger.jpg'
    }
  ];
  selectedBook: any = null;

  onBookClick(book: any) {
    this.selectedBook = book;
  }
}
