import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../src/App';

const Navbar = () => {
  const { userId, handleLogout } = useContext(UserContext);

  return (
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
            {/* Ajouter le lien vers la page favoris */}
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">Favorites</Link>
            </li>
            {userId ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
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
  );
};

export default Navbar;
