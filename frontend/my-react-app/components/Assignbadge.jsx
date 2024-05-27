// src/components/AssignBadge.jsx
import React, { useState } from 'react';

const AssignBadge = ({ userId }) => {
  const [badgeId, setBadgeId] = useState('');
  const [message, setMessage] = useState('');

  const handleAssign = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/badges/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, badgeId }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'attribution du badge');
      }

      setMessage('Badge attribué avec succès');
    } catch (error) {
      console.error(error);
      setMessage('Une erreur s\'est produite lors de l\'attribution du badge');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Attribuer un Badge</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleAssign}>
        <div className="mb-3">
          <label className="form-label">ID du Badge:</label>
          <input type="text" className="form-control" value={badgeId} onChange={(e) => setBadgeId(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Attribuer le Badge</button>
      </form>
    </div>
  );
};

export default AssignBadge;
