// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = { username, email, password };

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription');
      }

      const data = await response.json();
      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
    } catch (error) {
      console.error(error);
      alert('Une erreur s\'est produite lors de l\'inscription.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Inscription</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Nom d'utilisateur:</label>
          <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Mot de passe:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">S'inscrire</button>
      </form>
    </div>
  );
};

export default RegisterForm;
