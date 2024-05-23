import React from 'react';

const BookItem = ({ book }) => {
  return (
    <div>
      <h2>{book.title}</h2>
      <p>Auteur: {book.author}</p>
      <p>Catégorie: {book.category}</p>
      <p>Nombre de pages: {book.totalPages}</p>
      <img src={book.imageUrl} alt={book.title} style={{ maxWidth: '200px', maxHeight: '200px' }} />
      <p>État: {book.status}</p>
    </div>
  );
};

export default BookItem;
