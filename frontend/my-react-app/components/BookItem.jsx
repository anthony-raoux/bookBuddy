// BookItem.jsx
import React from 'react';

const BookItem = ({ book }) => (
  <div className="book-item">
    <img src={book.image} alt={book.title} />
    <div>
      <h3>{book.title}</h3>
      <p>Auteur: {book.author}</p>
      <p>État: {book.status}</p>
      <p>Pages: {book.pages}</p>
      <p>Catégorie: {book.category}</p>
    </div>
  </div>
);

export default BookItem;

