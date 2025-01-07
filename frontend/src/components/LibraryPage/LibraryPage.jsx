import React, { useState, useEffect } from 'react';
import Navigation from '../Home/navigation';
import './LibraryPage.css';
import axiosInstance from '../../axios';
import Confirmation from '../Confirmation/Confirmation';
import { useNavigate } from 'react-router-dom';

function LibraryPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [bookIndexes, setBookIndexes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [libraryPosition, setLibraryPosition] = useState(400);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books based on search

  useEffect(() => {
    axiosInstance.get('/categorie')
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });

    axiosInstance.get('/livre')
      .then((response) => {
        const fetchedBooks = response.data;
        setBooks(fetchedBooks);
        setFilteredBooks(fetchedBooks); // Initialize filteredBooks with all books
        const uniqueCategories = [...new Set(fetchedBooks.map((book) => book.categorie.nomCategorie))];
        const initialIndexes = uniqueCategories.reduce((acc, category) => {
          acc[category] = 0;
          return acc;
        }, {});
        setBookIndexes(initialIndexes);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === '') {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(
        books.filter((book) => book.titre.toLowerCase().includes(term))
      );
    }
  };

  const scroll = (category, direction) => {
    const booksInCategory = filteredBooks.filter((book) => book.categorie.nomCategorie === category);
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

  useEffect(() => {
    if (selectedCategory === 'All') {
      setLibraryPosition(400);
    } else {
      setLibraryPosition(0);
    }
  }, [selectedCategory]);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navigation />
      <div className="library-container" style={{ top: `${libraryPosition}px` }}>
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for a book..."
            className="search-input"
          />
        </div>

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

        {selectedCategory === 'All' ? (
          categories.map((category) => {
            const booksInCategory = filteredBooks.filter((book) => book.categorie.nomCategorie === category.nomCategorie);
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
                .filter((book) => book.categorie.nomCategorie === selectedCategory)
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
