import React, { useEffect, useState } from 'react';

const Badges = ({ userId }) => {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/badges/${userId}/badges`);
        const data = await response.json();
        setBadges(data.badges);
      } catch (error) {
        console.error('Erreur lors de la récupération des badges:', error);
      }
    };

    fetchBadges();
  }, [userId]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Mes Badges</h2>
      <div className="row">
        {badges.map((badge) => (
          <div key={badge._id} className="col-md-3">
            <div className="card mb-4">
              <img src={badge.icon} className="card-img-top" alt={badge.name} />
              <div className="card-body">
                <h5 className="card-title">{badge.name}</h5>
                <p className="card-text">{badge.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;

// ajouter modale a la liste des favoris, faire fonctionner les récompense/badges, supprimer un livre et rendre le site plus beau.