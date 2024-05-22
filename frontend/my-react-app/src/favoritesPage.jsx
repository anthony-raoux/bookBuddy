import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoritesPage = () => {
    const [favoriteBooks, setFavoriteBooks] = useState([]);

    useEffect(() => {
        // Fonction pour récupérer la liste des livres favoris depuis l'API
        const fetchFavoriteBooks = async () => {
            try {
                const response = await axios.get('/api/books/favorites');
                setFavoriteBooks(response.data);
            } catch (error) {
                console.error('Error fetching favorite books:', error);
            }
        };

        fetchFavoriteBooks();
    }, []);

    return (
        <div>
            <h1>My Favorite Books</h1>
            <ul>
                {favoriteBooks.map((book) => (
                    <li key={book._id}>{book.title} by {book.author}</li>
                ))}
            </ul>
        </div>
    );
};

export default FavoritesPage;
