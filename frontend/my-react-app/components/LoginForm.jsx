// src/components/LoginForm.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { email, password };

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la connexion');
      }

      const data = await response.json();
      onLogin(data.userId); // Passe l'ID de l'utilisateur connecté
      alert('Connexion réussie !');
    } catch (error) {
      console.error(error);
      alert('Une erreur s\'est produite lors de la connexion.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Connexion</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Mot de passe:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;
