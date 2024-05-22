import React from 'react';

// Boostrap 5.3
import 'bootstrap/dist/css/bootstrap.min.css';

// react-router-dom //
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Page généré //
import HomePage from './homePage';
import FavoritesPage from './favoritesPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';

// Components //
import Navbar from '../components/navbar';
import NotFound from '../components/notFound';

const App = () => {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              {/* <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} /> */}
              <Route path="*" element={<NotFound />} />
          </Routes>
      </Router>
  );
};

export default App;
