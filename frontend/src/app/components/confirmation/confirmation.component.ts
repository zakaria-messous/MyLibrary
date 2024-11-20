import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  livre: any; // Pour stocker les détails du livre

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Récupérer les paramètres de l'URL
    this.route.queryParams.subscribe(params => {
      this.livre = JSON.parse(params['livre']);  // Parsez les données JSON reçues
    });
  }

  confirmReservation(): void {
    // Logique pour confirmer la réservation
    alert('Réservation confirmée pour le livre : ' + this.livre.titre);
  }
}
