import React, { useState } from 'react';
import BookItem from './BookItem';

const BookList = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredBooks = books.filter((book) => {
    const matchesSearchTerm = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAuthorFilter = !authorFilter || book.author.toLowerCase() === authorFilter.toLowerCase();
    const matchesCategoryFilter = !categoryFilter || book.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearchTerm && matchesAuthorFilter && matchesCategoryFilter;
  });

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Recherche..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrer par auteur..."
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrer par catégorie..."
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />
      </div>
      <div>
        {filteredBooks.map((book, index) => (
          <BookItem key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
