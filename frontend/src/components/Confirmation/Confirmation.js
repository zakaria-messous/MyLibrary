import React from 'react';
import './Confirmation.css';

function Confirmation({ book, closeModal }) {
  // Function to handle reservation
  const handleReserve = () => {
    let reservedBooks = JSON.parse(localStorage.getItem('reservedBooks')) || [];
    reservedBooks.push(book);
    localStorage.setItem('reservedBooks', JSON.stringify(reservedBooks));

    alert('Réservation effectuée avec succès!');
    closeModal(); // Close the modal after reservation
  };

  return (
    <div className="confirmation-container">
      <h2>Réservation de livre</h2>
      {book ? (
        <div className="confirmation-details">
          <img src={book.imageUrl} alt={book.title} className="book-image" />
          <h3>{book.title}</h3>
          <p><strong>Auteur:</strong> {book.author}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <p><strong>Prix:</strong> {book.price} MAD</p>
          <p><strong>Copies disponibles:</strong> {book.availableCopies}</p>
          <button onClick={handleReserve}>Réserver</button>
          <button onClick={closeModal}>Fermer</button> {/* Close button */}
        </div>
      ) : (
        <p>Aucun livre sélectionné.</p>
      )}
    </div>
  );
}

export default Confirmation;
