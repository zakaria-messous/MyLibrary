import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import BookCard from '../BookCard/BookCard'; // Importer BookCard pour afficher chaque livre
import './Home.css';

function Home() {
  // Liste des livres à afficher dans Home.js
  const livres = [
    {
      id: 1,
      titre: "Le Livre des Secrets",
      auteur: "John Doe",
      description: "Un livre fascinant sur les secrets de la vie.",
      prix: 150.00,
      nombreCopieDispo: 20,
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      titre: "L'Aventure Infinie",
      auteur: "Jane Smith",
      description: "Une aventure qui repousse les limites de l'imagination.",
      prix: 200.00,
      nombreCopieDispo: 15,
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      titre: "Les Mystères de l'Univers",
      auteur: "Albert Einstein",
      description: "Explorez les mystères de l'univers à travers la science.",
      prix: 250.00,
      nombreCopieDispo: 30,
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      id: 4,
      titre: "Le Voyage Temporel",
      auteur: "Isaac Newton",
      description: "Un voyage fascinant à travers le temps et l'espace.",
      prix: 180.00,
      nombreCopieDispo: 25,
      imageUrl: "https://via.placeholder.com/150"
    }
  ];

  // State pour stocker les détails du livre sélectionné
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate(); // Pour la navigation

  // Fonction pour afficher les détails du livre dans un modal
  const handleBookClick = (livre) => {
    setSelectedBook(livre);
  };

  // Fonction pour fermer le modal
  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  // Fonction pour rediriger vers la page de réservation
  const handleBuyClick = () => {
    navigate('/login', { state: { book: selectedBook } }); // Passer les détails du livre via state
  };

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="home-text-section">
          <h1 className="welcome-text">Welcome to MyLibrary</h1>
          <p>Your favorite online library for books and resources.</p>
        </div>
        </div>
        {/* Section des livres */}
        <div className="books-section">
  <h2>Books</h2>
  <div className="books-list">
    {livres.length === 0 ? (
      <p>No books available</p>
    ) : (
      livres.map(livre => (
        <BookCard 
          key={livre.id} 
          book={livre}  // Vérifiez que "livre" a les bonnes propriétés
          onClick={() => handleBookClick(livre)} 
        />
      ))
    )}
  </div>
</div>

     

      {/* Modal avec les détails du livre */}
      {selectedBook && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedBook.titre}</h2>
            <p><strong>Auteur:</strong> {selectedBook.auteur}</p>
            <p><strong>Description:</strong> {selectedBook.description}</p>
            <p><strong>Prix:</strong> {selectedBook.prix} MAD</p>
            <p><strong>Copies disponibles:</strong> {selectedBook.nombreCopieDispo}</p>
            <button onClick={handleCloseModal}>Fermer</button>
            <button onClick={handleBuyClick}>Acheter</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
