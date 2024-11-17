import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book',
  standalone: true,
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  @Input() title!: string;
  @Input() author!: string;
  @Input() description!: string;
  @Input() image!: string;

  @Output() bookClicked = new EventEmitter<void>();

  onBookClick() {
    console.log('Livre cliqué :', this.title);
    this.bookClicked.emit();
  }
}
