// src/app/services/livre.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre } from '../models/livre.model';

@Injectable({
  providedIn: 'root'
})
export class LivreService {
  private apiUrl = 'http://localhost:8080/api/livres'; // Remplace par l'URL de ton backend

  constructor(private http: HttpClient) {}

  // Récupérer tous les livres
  getLivres(): Observable<Livre[]> {
    return this.http.get<Livre[]>(this.apiUrl);
  }

  // Récupérer un livre par ID
  getLivreById(id: number): Observable<Livre> {
    return this.http.get<Livre>(`${this.apiUrl}/${id}`);
  }
}
