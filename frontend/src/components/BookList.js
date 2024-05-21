import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('There was an error fetching the books!', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map(book => (
          <li key={book._id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
