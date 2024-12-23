import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import BookCard from '../BookCard/BookCard'; // Import BookCard to display each book
import './LibraryPage.css'; // Import specific styles

function LibraryPage() {
  // List of books to display in LibraryPage
  const books = [
    {
      id: 1,
      title: "The Book of Secrets",
      author: "John Doe",
      description: "A fascinating book about the secrets of life.",
      price: 150.00,
      availableCopies: 20,
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      title: "The Infinite Adventure",
      author: "Jane Smith",
      description: "An adventure that pushes the limits of imagination.",
      price: 200.00,
      availableCopies: 15,
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      title: "The Mysteries of the Universe",
      author: "Albert Einstein",
      description: "Explore the mysteries of the universe through science.",
      price: 250.00,
      availableCopies: 30,
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      id: 4,
      title: "The Time Travel Journey",
      author: "Isaac Newton",
      description: "A fascinating journey through time and space.",
      price: 180.00,
      availableCopies: 25,
      imageUrl: "https://via.placeholder.com/150"
    }
  ];

  // State to store the selected book details
  const [selectedBook, setSelectedBook] = useState(null);
  
  const navigate = useNavigate(); // For navigation

  // Function to display the book details in a modal
  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  // Function to redirect to the reservation page
  const handleBuyClick = () => {
    navigate('/confirmation', { state: { book: selectedBook } }); // Pass the book details via state
  };

  return (
    <div>
      <Navbar />
      <div className="library-container">
        <div className="library-text-section">
          <h1 className="welcome-text">Welcome to MyLibrary</h1>
          <p>Your favorite online library for books and resources.</p>
        </div>

        {/* Section of books */}
        <div className="books-section">
          <h2>Books</h2>
          <div className="books-list">
            {books.map(book => (
              <BookCard 
                key={book.id} 
                book={book} 
                onClick={() => handleBookClick(book)}  // Pass the click handler to BookCard
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal displaying the book details */}
      {selectedBook && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedBook.title}</h2>
            <p><strong>Author:</strong> {selectedBook.author}</p>
            <p><strong>Description:</strong> {selectedBook.description}</p>
            <p><strong>Price:</strong> {selectedBook.price} MAD</p>
            <p><strong>Available Copies:</strong> {selectedBook.availableCopies}</p>
            <button onClick={handleCloseModal}>Close</button>
            <button onClick={handleBuyClick}>Reserve</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LibraryPage; 
