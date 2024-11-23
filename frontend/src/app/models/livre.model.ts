// src/app/models/livre.model.ts
export interface Livre {
  id: number;
  titre: string;
  auteur: string;
  description: string;
  disponibilite: boolean;
  nombreCopieDispo: number;
  prix: number;
  categorieId?: number; // Optionnel car @JsonIgnore
}
