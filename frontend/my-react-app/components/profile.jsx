// src/components/Profile.jsx
import React, { useState, useContext } from 'react';
import { UserContext } from '../src/App';

const Profile = () => {
  const { userId } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, newPassword }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du mot de passe');
      }

      setMessage('Mot de passe mis à jour avec succès');
    } catch (error) {
      console.error(error);
      setMessage('Une erreur s\'est produite lors de la mise à jour du mot de passe');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Profile</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleChangePassword}>
        <div className="mb-3">
          <label className="form-label">Mot de passe actuel:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Nouveau mot de passe:</label>
          <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Changer le mot de passe</button>
      </form>
    </div>
  );
};

export default Profile;
