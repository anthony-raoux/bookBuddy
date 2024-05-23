import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../components/home';
import About from '../components/about';
import NotFound from '../components/notFound';
import AddBookForm from '../components/addBookform';
import BookList from '../components/BookList';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css'; // Importer le fichier CSS personnalisé

export const UserContext = createContext();

const App = () => {
  const [books, setBooks] = useState([]);
  const [userId, setUserId] = useState(null);

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const handleLogin = (id) => {
    setUserId(id);
  };

  return (
    <UserContext.Provider value={userId}>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">BookBuddy</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add">Add Book</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/books">Book List</Link>
                </li>
                {!userId && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">Register</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/add" element={<AddBookForm addBook={addBook} />} />
            <Route path="/books" element={<BookList books={books} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
