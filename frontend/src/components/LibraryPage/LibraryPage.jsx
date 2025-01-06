import React, { useState, useEffect } from 'react';
import Navigation from '../Home/navigation';
import './LibraryPage.css';
import booksData from '../../data/data.json'; // Adjust the path if necessary
import Confirmation from '../Confirmation/Confirmation'; // Import the Confirmation component

function LibraryPage() {
  const books = booksData.books; // Directly use the imported JSON data
  const categories = [...new Set(books.map((book) => book.category))];

  const [bookIndexes, setBookIndexes] = useState(
    categories.reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {})
  );

  const [selectedCategory, setSelectedCategory] = useState('All'); // State for selected category
  const [libraryPosition, setLibraryPosition] = useState(400); // State for the library container's top position
  const [selectedBook, setSelectedBook] = useState(null); // State for the selected book to show in Confirmation
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const scroll = (category, direction) => {
    const booksInCategory = books.filter((book) => book.category === category);
    const totalBooks = booksInCategory.length;
    const currentIndex = bookIndexes[category];

    let newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;

    if (totalBooks <= 5) {
      return;
    }

    if (newIndex < 0) {
      newIndex = totalBooks - 1;
    } else if (newIndex >= totalBooks) {
      newIndex = 0;
    }

    setBookIndexes((prev) => ({
      ...prev,
      [category]: newIndex,
    }));
  };

  // Filter books based on selected category
  const filteredBooks =
    selectedCategory === 'All' ? books : books.filter((book) => book.category === selectedCategory);

  // Handle category change to adjust the library container's position
  useEffect(() => {
    if (selectedCategory === 'All') {
      setLibraryPosition(400);
    } else {
      setLibraryPosition(0); // Move to the top when a category is selected
    }
  }, [selectedCategory]); // Trigger when the category is changed

  // Handle book click to select a book for reservation and open the modal
  const handleBookClick = (book) => {
    setSelectedBook(book); // Set the selected book to show in the confirmation
    setIsModalOpen(true); // Open the modal
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null); // Reset the selected book
  };

  return (
    <div>
      <Navigation />
      <div className="library-container" style={{ top: `${libraryPosition}px` }}>
        {/* Category filter dropdown */}
        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Render books based on the selected category */}
        {selectedCategory === 'All' ? (
          categories.map((category) => {
            const booksInCategory = books.filter((book) => book.category === category);
            const totalBooks = booksInCategory.length;

            if (totalBooks < 1) {
              return (
                <div key={category} className="category-section">
                  <h2>{category}</h2>
                  <p>No books available in this category</p>
                </div>
              );
            }

            return (
              <div key={category} className="category-section">
                <h2>{category}</h2>
                <div className="books-row">
                  <button className="scroll-button-left" onClick={() => scroll(category, 'left')}>
                    &lt;
                  </button>
                  {booksInCategory
                    .slice(bookIndexes[category], bookIndexes[category] + 5)
                    .map((book) => (
                      <div key={book.id} className="book-card" onClick={() => handleBookClick(book)}>
                        <img src={book.imageUrl} alt={book.title} />
                        <div className="book-details">
                          <h3>{book.title}</h3>
                          <p>{book.author}</p>
                          <p>{book.price} MAD</p>
                        </div>
                      </div>
                    ))}
                  <button className="scroll-button-right" onClick={() => scroll(category, 'right')}>
                    &gt;
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="category-section">
            <h2>{selectedCategory}</h2>
            <div className="books-row">
              <button className="scroll-button-left" onClick={() => scroll(selectedCategory, 'left')}>
                &lt;
              </button>
              {filteredBooks
                .slice(bookIndexes[selectedCategory], bookIndexes[selectedCategory] + 5)
                .map((book) => (
                  <div key={book.id} className="book-card" onClick={() => handleBookClick(book)}>
                    <img src={book.imageUrl} alt={book.title} />
                    <div className="book-details">
                      <h3>{book.title}</h3>
                      <p>{book.author}</p>
                      <p>{book.price} MAD</p>
                    </div>
                  </div>
                ))}
              <button className="scroll-button-right" onClick={() => scroll(selectedCategory, 'right')}>
                &gt;
              </button>
            </div>
          </div>
        )}

        {/* Conditionally render the Confirmation modal */}
        {isModalOpen && selectedBook && (
          <div className="modal-overlay">
            <div className="modal-content">
              <Confirmation book={selectedBook} closeModal={closeModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LibraryPage;
