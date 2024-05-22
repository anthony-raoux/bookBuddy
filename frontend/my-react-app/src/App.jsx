import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../components/home';
import About from '../components/about';
import NotFound from '../components/notFound';
import AddBookForm from '../components/addBookform';
import BookList from '../components/BookList';

const App = () => {
  const [books, setBooks] = useState([]);

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/add">Add Book</Link></li>
          <li><Link to="/books">Book List</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/add" element={<AddBookForm addBook={addBook} />} />
        <Route path="/books" element={<BookList books={books} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
