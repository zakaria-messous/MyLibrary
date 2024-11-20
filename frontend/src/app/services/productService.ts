import { Injectable } from '@angular/core';
import { Livre } from '../models/livre';

@Injectable({
  providedIn: 'root', // S'assure que le service est disponible globalement
})
export class ProductService {
  getLivres() {
    return Promise.resolve(this.getLivresData());
  }

  getLivresData() {
    return [
      {
        id: '1001',
        titre: 'Le Petit Prince',
        auteur: 'Antoine de Saint-Exupéry',
        description: 'A tale about a young prince and his adventures.',
        disponibilite: true,
        nombreCopieDispo: 10,
        prix: 15,
        categorie: 'Roman',
        image: 'le-petit-prince.jpg'
      },
      {
        id: '1002',
        titre: '1984',
        auteur: 'George Orwell',
        description: 'A dystopian social science fiction novel and cautionary tale.',
        disponibilite: false,
        nombreCopieDispo: 0,
        prix: 20,
        categorie: 'Science-fiction',
        image: '1984.jpg'
      },
      {
        id: '1003',
        titre: 'Le Petit Prince',
        auteur: 'Antoine de Saint-Exupéry',
        description: 'A tale about a young prince and his adventures.',
        disponibilite: true,
        nombreCopieDispo: 10,
        prix: 15,
        categorie: 'Roman',
        image: 'le-petit-prince.jpg'
      },
      {
        id: '1004',
        titre: '1984',
        auteur: 'George Orwell',
        description: 'A dystopian social science fiction novel and cautionary tale.',
        disponibilite: false,
        nombreCopieDispo: 0,
        prix: 20,
        categorie: 'Science-fiction',
        image: '1984.jpg'
      },
      {
        id: '1005',
        titre: 'Le Petit Prince',
        auteur: 'Antoine de Saint-Exupéry',
        description: 'A tale about a young prince and his adventures.',
        disponibilite: true,
        nombreCopieDispo: 10,
        prix: 15,
        categorie: 'Roman',
        image: 'le-petit-prince.jpg'
      },
      {
        id: '1006',
        titre: '1984',
        auteur: 'George Orwell',
        description: 'A dystopian social science fiction novel and cautionary tale.',
        disponibilite: false,
        nombreCopieDispo: 0,
        prix: 20,
        categorie: 'Science-fiction',
        image: '1984.jpg'
      }
      // Ajoute plus de livres selon les besoins
    ];
  }
}
