import React, { useState } from 'react';
import './Confirmation.css';
import axiosInstance from '../../axios'; // Import your axios instance

function Confirmation({ book, closeModal }) {
  // State to manage selected reservation date
  const [reservationDate, setReservationDate] = useState('');
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for handling errors

  // Function to handle date change
  const handleDateChange = (e) => {
    setReservationDate(e.target.value);
  };

  // Function to handle book reservation
  const handleReserve = () => {
    if (!reservationDate) {
      alert('Veuillez sélectionner une date pour la réservation.');
      return;
    }

    setLoading(true); // Set loading to true when starting the API request
    setError(null); // Reset previous errors

    // Make the API call to rent the book
    axiosInstance.post(`/livre/rent?id=${book.id}&date=${reservationDate}`)
      .then((response) => {
        // If the reservation is successful
        alert('Réservation effectuée avec succès!');
        closeModal(); // Close the modal after reservation
        setLoading(false); // Set loading to false after completion
      })
      .catch((error) => {
        // If there's an error with the reservation
        setError('Une erreur est survenue lors de la réservation.');
        setLoading(false); // Set loading to false after completion
        console.error('Error renting book:', error);
      });
  };

  return (
    <div className="confirmation-container">
      <h2>Réservation de livre</h2>
      {book ? (
        <div className="confirmation-details">
          <img src={book.imageUrl} alt={book.titre} className="book-image" />
          <h3>{book.titre}</h3>
          <p><strong>Auteur:</strong> {book.auteur}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <p><strong>Prix:</strong> {book.prix} MAD</p>
          <p><strong>Copies disponibles:</strong> {book.nombreCopieDispo}</p>

          {/* Date Picker Form */}
          <div className="reservation-date">
            <label htmlFor="reservation-date">Date de réservation:</label>
            <input
              type="date"
              id="reservation-date"
              value={reservationDate}
              onChange={handleDateChange}
              min={new Date().toISOString().split("T")[0]} // Disable past dates
            />
          </div>

          {/* Show error if reservation date is not set */}
          {error && <p className="error-message">{error}</p>}

          {/* Reserve Button */}
          <button onClick={handleReserve} disabled={loading}>
            {loading ? 'Réservation en cours...' : 'Réserver'}
          </button>

          {/* Close Button */}
          <button onClick={closeModal}>Fermer</button>
        </div>
      ) : (
        <p>Aucun livre sélectionné.</p>
      )}
    </div>
  );
}

export default Confirmation;
