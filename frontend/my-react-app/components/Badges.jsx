// Badges.js
import React, { useEffect, useState } from 'react';

const Badges = () => {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    fetch('/api/badges')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => setBadges(data))
  .catch(error => console.error('Error fetching badges:', error));

  }, []);

  return (
    <div>
      <h1>Badges</h1>
      <div className="badge-container">
        {badges.map(badge => (
          <div key={badge._id} className="badge">
            <img src={badge.icon} alt={badge.name} />
            <h3>{badge.name}</h3>
            <p>{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;  
