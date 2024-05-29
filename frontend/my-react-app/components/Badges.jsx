import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Badges = ({ userId }) => {
  const [allBadges, setAllBadges] = useState([]);
  const [userBadges, setUserBadges] = useState([]);

  useEffect(() => {
    const fetchBadges = async () => {
      if (userId) {
        const response = await axios.get(`http://localhost:5000/api/badges/${userId}`);
        setAllBadges(response.data.badges);
        setUserBadges(response.data.userBadges);
      }
    };
    fetchBadges();
  }, [userId]);

  if (!userId) {
    return <p>Please log in to see your badges.</p>;
  }

  return (
    <div>
      <h1>Your Badges</h1>
      <ul>
        {allBadges.map((badge) => (
          <li key={badge._id} style={{ color: userBadges.includes(badge.name) ? 'black' : 'gray' }}>
            <img 
              src={badge.icon} 
              alt={badge.name} 
              style={{ filter: userBadges.includes(badge.name) ? 'none' : 'grayscale(100%)', width: '50px', height: '50px' }}
            />
            <span>{badge.name}: {badge.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Badges;
