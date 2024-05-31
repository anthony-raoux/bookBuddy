import React, { useState, useEffect } from 'react';
import BookItem from './BookItem';
import BookModal from './BookModal';
import '../src/custom.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des livres');
        }
        const booksData = await response.json();
        setBooks(booksData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesTitle = book.title.toLowerCase().includes(searchLower);
    const matchesAuthor = book.author.toLowerCase().includes(searchLower);
    const matchesCategory = (book.category ?? '').toLowerCase().includes(searchLower);
    return matchesTitle || matchesAuthor || matchesCategory;
  });

  const toggleFavorite = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/favorite/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to toggle favorite status');
      }
      const updatedBook = await response.json();
      updateBookStatus(updatedBook); // Mettre à jour l'état du livre dans le state après mise à jour dans la base de données
    } catch (error) {
      console.error(error);
    }
  };

  const removeFavorite = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/favorite/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to remove from favorites');
      }
      const updatedBook = await response.json();
      updateBookStatus(updatedBook); // Mettre à jour l'état du livre dans le state après mise à jour dans la base de données
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const updateBookStatus = (updatedBook) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book._id === updatedBook._id ? updatedBook : book
      )
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Recherche par titre, auteur ou catégorie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        {filteredBooks.map((book, index) => (
          <div className="col-md-4 book-container d-flex justify-content-center" key={index}>
            <div className="book-item text-center">
              <BookItem book={book} onBookClick={handleBookClick} />
              {book.isFavorite ? (
                <button className="book-button" onClick={() => removeFavorite(book._id)}>
                  Retirer des favoris
                </button>
              ) : (
                <button className="book-button" onClick={() => toggleFavorite(book._id)}>
                  Ajouter aux favoris
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {selectedBook && (
        <BookModal 
          book={selectedBook} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          onSave={updateBookStatus} 
          id={selectedBook._id}
        />
      )}
    </div>
  );
};

export default BookList;
