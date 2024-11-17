import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-details',
  standalone: true,
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  @Input() title!: string;
  @Input() author!: string;
  @Input() description!: string;
  @Input() image!: string;

  addToCart() {
    console.log(`${this.title} a été ajouté au panier.`);
  }
}
