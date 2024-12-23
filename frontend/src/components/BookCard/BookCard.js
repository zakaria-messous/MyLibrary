import React from 'react';

function BookCard({ book, onClick }) {
    if (!book) {
      return <div>No book available</div>;  // Handle missing book
    }
  
    return (
      <div className="book-card" onClick={onClick}>
        <img src={book.imageUrl} alt={book.titre} /> {/* Utilisez "titre" ici */}
        <h3>{book.titre}</h3> {/* Utilisez "titre" ici */}
        <p>{book.auteur}</p> {/* Utilisez "auteur" ici */}
        <p>{book.prix} MAD</p> {/* Utilisez "prix" ici */}
      </div>
    );
  }
  

export default BookCard;
