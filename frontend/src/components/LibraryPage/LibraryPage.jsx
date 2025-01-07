import React, { useState, useEffect } from 'react';
import Navigation from '../Home/navigation';
import './LibraryPage.css';
import axiosInstance from '../../axios'; // Import the custom Axios instance
import Confirmation from '../Confirmation/Confirmation'; // Import the Confirmation component
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function LibraryPage() {
  const navigate = useNavigate(); // To navigate on logout
  const [books, setBooks] = useState([]); // State for books data
  const [categories, setCategories] = useState([]); // State for book categories
  const [bookIndexes, setBookIndexes] = useState({}); // State for tracking book indexes
  const [selectedCategory, setSelectedCategory] = useState('All'); // State for selected category
  const [libraryPosition, setLibraryPosition] = useState(400); // State for the library container's top position
  const [selectedBook, setSelectedBook] = useState(null); // State for the selected book to show in Confirmation
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [loading, setLoading] = useState(true); // State for loading status

  // Fetch books and categories from APIs on component mount
  useEffect(() => {
    // Fetch categories first
    axiosInstance.get('/categorie') // Use the Axios instance to fetch categories
      .then((response) => {
        setCategories(response.data); // Set fetched categories
        setLoading(false); // Set loading to false once categories are fetched
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false); // Stop loading in case of error
      });
    
    // Fetch books after categories are fetched
    axiosInstance.get('/livre') // Use the Axios instance for API call
      .then((response) => {
        const fetchedBooks = response.data;
        setBooks(fetchedBooks);
        // Set categories dynamically based on fetched books
        const uniqueCategories = [...new Set(fetchedBooks.map((book) => book.categorie.nomCategorie))];
        // Initialize book indexes based on categories
        const initialIndexes = uniqueCategories.reduce((acc, category) => {
          acc[category] = 0;
          return acc;
        }, {});
        setBookIndexes(initialIndexes);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setLoading(false); // Stop loading in case of error
      });
  }, []);

  const scroll = (category, direction) => {
    const booksInCategory = books.filter((book) => book.categorie.nomCategorie === category);
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
    selectedCategory === 'All' ? books : books.filter((book) => book.categorie.nomCategorie === selectedCategory);

  // Handle category change to adjust the library container's position
  useEffect(() => {
    if (selectedCategory === 'All') {
      setLibraryPosition(400);
    } else {
      setLibraryPosition(0); // Move to the top when a category is selected
    }
  }, [selectedCategory]);

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

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching books
  }

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
            {categories && categories.map((category) => (
              <option key={category.id} value={category.nomCategorie}>
                {category.nomCategorie}
              </option>
            ))}
          </select>
        </div>

        {/* Render books based on the selected category */}
        {selectedCategory === 'All' ? (
          categories.map((category) => {
            const booksInCategory = books.filter((book) => book.categorie.nomCategorie === category.nomCategorie);
            const totalBooks = booksInCategory.length;

            if (totalBooks < 1) {
              return (
                <div key={category.id} className="category-section">
                  <h2>{category.nomCategorie}</h2>
                  <p>No books available in this category</p>
                </div>
              );
            }

            return (
              <div key={category.id} className="category-section">
                <h2>{category.nomCategorie}</h2>
                <div className="books-row">
                  <button className="scroll-button-left" onClick={() => scroll(category.nomCategorie, 'left')}>
                    &lt;
                  </button>
                  {booksInCategory
                    .slice(bookIndexes[category.nomCategorie], bookIndexes[category.nomCategorie] + 5)
                    .map((book) => (
                      <div key={book.id} className="book-card" onClick={() => handleBookClick(book)}>
                        <img src={book.imageUrl} alt={book.titre} />
                        <div className="book-details">
                          <h3>{book.titre}</h3>
                          <p>{book.auteur}</p>
                          <p>{book.prix} MAD</p>
                        </div>
                      </div>
                    ))}
                  <button className="scroll-button-right" onClick={() => scroll(category.nomCategorie, 'right')}>
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
                    <img src={book.imageUrl} alt={book.titre} />
                    <div className="book-details">
                      <h3>{book.titre}</h3>
                      <p>{book.auteur}</p>
                      <p>{book.prix} MAD</p>
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
