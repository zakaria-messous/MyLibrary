import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Confirmation.css';

function Confirmation() {
  const location = useLocation(); // Récupérer les détails du livre passé via state
  const navigate = useNavigate(); // Pour rediriger l'utilisateur vers la page de réservation

  const book = location.state?.book;

  // Fonction pour gérer la réservation
  const handleReserve = () => {
    // Récupérer les réservations précédentes depuis localStorage
    let reservedBooks = JSON.parse(localStorage.getItem('reservedBooks')) || [];

    // Ajouter le livre réservé à la liste
    reservedBooks.push(book);

    // Sauvegarder la liste mise à jour dans localStorage
    localStorage.setItem('reservedBooks', JSON.stringify(reservedBooks));

    // Afficher un message de succès et rediriger vers la page de réservations
    alert('Réservation effectuée avec succès !');
    navigate('/reservations'); // Redirige vers la page des réservations
  };

  return (
    <div className="Confirmation-container">
      <h2>Réservation de livre</h2>
      {book ? (
        <div className="Confirmation-details">
          <img src={book.imageUrl} alt={book.titre} className="book-image" />
          <h3>{book.titre}</h3>
          <p><strong>Auteur:</strong> {book.auteur}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <p><strong>Prix:</strong> {book.prix} MAD</p>
          <p><strong>Copies disponibles:</strong> {book.nombreCopieDispo}</p>
          <button onClick={handleReserve}>Réserver</button>
        </div>
      ) : (
        <p>Aucun livre sélectionné.</p>
      )}
    </div>
  );
}

export default Confirmation;
