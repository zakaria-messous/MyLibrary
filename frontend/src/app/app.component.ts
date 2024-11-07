// app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importer RouterModule
import { RouterOutlet } from '@angular/router'; // Importer RouterOutlet pour l'utiliser dans le template

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule], // Ajouter RouterModule et RouterOutlet ici
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}
