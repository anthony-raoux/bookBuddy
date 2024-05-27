import React, { useState, useEffect } from 'react';
import BookItem from './BookItem';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import '../src/custom.css'; 
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

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Favorite Books</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {favoriteBooks.length > 0 ? (
          favoriteBooks.map((book, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <BookItem book={book} />
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

