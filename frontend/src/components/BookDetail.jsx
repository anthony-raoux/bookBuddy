import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/api/books/book/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('There was an error fetching the book details!', error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Status: {book.status}</p>
      <p>Current Page: {book.currentPage}</p>
      <p>Favorite: {book.isFavorite ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default BookDetail;
