import React from 'react';
import { Link } from 'react-router-dom';

// Boostrap 5.3
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap-icons/font/bootstrap-icons.css'; // Importe toutes les icônes Bootstrap

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-black">
            <div className="container-fluid d-flex align-items-center justify-content-between">
                <div>
                    <Link className="navbar-brand text-light" to="/">Book Buddy</Link>
                    <i className="bi bi-search text-light"></i>
                </div>
                <div>
                    <button data-bs-theme="dark" className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/favorites">Favorites</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/register">Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

