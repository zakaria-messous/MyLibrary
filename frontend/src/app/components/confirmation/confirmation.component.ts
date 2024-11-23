import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NavComponent} from '../nav/nav.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  standalone: true,
  imports: [CommonModule, NavComponent],
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  livre: any; // Pour stocker les détails du livre

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    // Récupérer les paramètres de l'URL
    this.route.queryParams.subscribe(params => {
      this.livre = JSON.parse(params['livre']);  // Parsez les données JSON reçues
    });
  }

  confirmReservation(): void {
    // Logique pour confirmer la réservation
    alert('Réservation confirmée pour le livre : ' + this.livre.titre);
  
    // Récupérer la liste des livres réservés existants ou créer un tableau vide
    let reservedBooks = JSON.parse(localStorage.getItem('reservedBooks') || '[]');
    
    // Ajouter le livre à la liste des réservations
    reservedBooks.push(this.livre);
    
    // Sauvegarder la liste mise à jour dans le localStorage
    localStorage.setItem('reservedBooks', JSON.stringify(reservedBooks));
  
    // Vérifier le contenu du localStorage
    console.log(localStorage.getItem('reservedBooks'));
  
    // Rediriger vers MyBooks après confirmation
  }
}