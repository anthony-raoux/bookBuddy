import React, { useState, useEffect } from 'react';
import BookItem from './BookItem';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FavoritesPage = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books/favorites/all');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des livres favoris');
        }
        const favoriteBooksData = await response.json();
        setFavoriteBooks(favoriteBooksData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFavoriteBooks();
  }, []);

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
      setFavoriteBooks(prevBooks => {
        return prevBooks.map(book =>
          book._id === id ? { ...book, isFavorite: !book.isFavorite } : book
        );
      });
    } catch (error) {
      setError(error.message);
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
      setFavoriteBooks(prevBooks => prevBooks.filter(book => book._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Favorite Books</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {favoriteBooks.length > 0 ? (
          favoriteBooks.map((book, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <BookItem book={book} />
              {book.isFavorite ? (
                <button className="btn btn-danger mt-2" onClick={() => removeFavorite(book._id)}>
                  Remove from Favorites
                </button>
              ) : (
                <button className="btn btn-primary mt-2" onClick={() => toggleFavorite(book._id)}>
                  Add to Favorites
                </button>
              )}
            </Col>
          ))
        ) : (
          <Col>
            <p>No favorite books yet.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default FavoritesPage;
