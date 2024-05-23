import React, { useState, useEffect } from 'react';
import BookItem from './BookItem';
import 'bootstrap/dist/css/bootstrap.min.css';


const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

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
  }, []); // Exécute le chargement des livres uniquement au montage du composant

  const filteredBooks = books.filter((book) => {
    const matchesSearchTerm = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAuthorFilter = !authorFilter || book.author.toLowerCase() === authorFilter.toLowerCase();
    const matchesCategoryFilter = !categoryFilter || (book.category ?? '').toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesSearchTerm && matchesAuthorFilter && matchesCategoryFilter;
  });  

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Recherche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Filtrer par auteur..."
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Filtrer par catégorie..."
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        {filteredBooks.map((book, index) => (
          <div className="col-md-4" key={index}>
            <BookItem book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
