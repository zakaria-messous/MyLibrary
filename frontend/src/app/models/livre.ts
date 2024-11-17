export interface Livre {
    id?: string;
    titre?: string;
    auteur?: string;
    description?: string;
    disponibilite?: boolean;
    nombreCopieDispo?: number;
    prix?: number;
    categorie?: string;
    image?: string; // Pour l'importation d'image
}