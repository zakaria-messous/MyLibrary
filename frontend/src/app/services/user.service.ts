import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model'; // Importer le modèle User

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  // Méthode pour récupérer les informations de l'utilisateur (données simulées)
  getUserProfile(): Observable<User> {
    const mockUser: User = {
      id: 1,
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      role: 'USER',
      createdAt: '2023-01-01T12:00:00Z',
      updatedAt: '2023-11-21T12:00:00Z'
    };

    // Retourner un observable contenant les données simulées
    return of(mockUser);
  }

  // Méthode optionnelle pour mettre à jour l'utilisateur (données simulées)
  updateUserProfile(user: User): Observable<User> {
    // Ici, nous simulons une mise à jour en renvoyant l'utilisateur mis à jour
    return of(user);
  }
}
