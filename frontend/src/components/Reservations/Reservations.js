import React, { useState, useEffect } from 'react';
import './Reservations.css';
import Navbar from '../Navbar/Navbar';

function Reservations() {
  const [reservedBooks, setReservedBooks] = useState([]);
  const [returnDate, setReturnDate] = useState({}); // État pour les dates de retour

  // Charger les livres réservés depuis localStorage
  useEffect(() => {
    const books = JSON.parse(localStorage.getItem('reservedBooks')) || [];
    setReservedBooks(books);
  }, []);

  // Fonction pour annuler une réservation
  const handleCancelReservation = (index) => {
    let updatedBooks = [...reservedBooks];
    updatedBooks.splice(index, 1); // Retirer le livre réservé à l'index spécifié
    localStorage.setItem('reservedBooks', JSON.stringify(updatedBooks));
    setReservedBooks(updatedBooks);
  };

  // Fonction pour changer la date de retour
  const handleChangeReturnDate = (bookIndex, newDate) => {
    // Vérification si la date est valide (doit être dans le futur)
    const today = new Date();
    const selectedDate = new Date(newDate);

    if (selectedDate < today) {
      alert('Erreur: La date de retour ne peut pas être dans le passé.');
      return; // Empêche la mise à jour si la date est dans le passé
    }

    let updatedBooks = [...reservedBooks];
    updatedBooks[bookIndex].returnDate = newDate; // Mettre à jour la date de retour du livre
    localStorage.setItem('reservedBooks', JSON.stringify(updatedBooks));
    setReservedBooks(updatedBooks);

    alert('Date de retour modifiée avec succès !');
  };

  // Fonction pour gérer le changement de date
  const handleDateChange = (event, bookIndex) => {
    const newDate = event.target.value;
    setReturnDate((prev) => ({
      ...prev,
      [bookIndex]: newDate
    }));
    handleChangeReturnDate(bookIndex, newDate);
  };

  return (
    <div>
      <Navbar />
      <div className="Reservations-container">
        <h2>Mes Réservations</h2>
        {reservedBooks.length > 0 ? (
          <div className="reserved-books-list">
            {reservedBooks.map((book, index) => (
              <div key={index} className="reserved-book-card">
                <img src={book.imageUrl} alt={book.titre} className="book-image" />
                <div className="book-info">
                  <h3>{book.titre}</h3>
                  <p><strong>Auteur:</strong> {book.auteur}</p>
                  <p><strong>Description:</strong> {book.description}</p>
                  <p><strong>Prix:</strong> {book.prix} MAD</p>
                  <p><strong>Copies disponibles:</strong> {book.nombreCopieDispo}</p>

                  {/* Date de retour */}
                  <p><strong>Date de retour:</strong> {book.returnDate ? book.returnDate : "Pas encore définie"}</p>

                  {/* Sélectionner une nouvelle date de retour */}
                  <label>
                    Nouvelle date de retour:
                    <input
                      type="date"
                      value={returnDate[index] || ''}
                      onChange={(e) => handleDateChange(e, index)}
                    />
                  </label>

                  {/* Boutons pour annuler ou changer la réservation */}
                  <div className="buttons-container">
                    <button onClick={() => handleCancelReservation(index)} className="cancel-button">
                      Annuler la réservation
                    </button>
                    <button className="change-date-button">
                      Changer la date de retour
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucune réservation effectuée.</p>
        )}
      </div>
    </div>
  );
}

export default Reservations;
