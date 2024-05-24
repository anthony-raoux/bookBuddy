import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../components/home';
import About from '../components/about';
import NotFound from '../components/notFound';
import AddBookForm from '../components/addBookform';
import BookList from '../components/BookList';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import Profile from '../components/profile';
import Navbar from '../components/Navbar';
import FavoritesPage from '../components/FavoritesPage'; // Importez la page FavoritesPage ici
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css'; // Importer le fichier CSS personnalisé

export const UserContext = createContext();

const App = () => {
  const [books, setBooks] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const handleLogin = (id) => {
    setUserId(id);
    localStorage.setItem('userId', id);
  };

  const handleLogout = () => {
    setUserId(null);
    localStorage.removeItem('userId');
  };

  return (
    <UserContext.Provider value={{ userId, handleLogout }}>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/add" element={<AddBookForm addBook={addBook} />} />
            <Route path="/books" element={<BookList books={books} />} />
            <Route path="/favorites" element={<FavoritesPage favoriteBooks={books.filter(book => book.isFavorite)} />} /> {/* Ajoutez cette ligne pour la page favoris */}
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
