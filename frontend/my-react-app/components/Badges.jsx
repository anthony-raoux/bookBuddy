import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Badges = ({ userId }) => {
  const [allBadges, setAllBadges] = useState([]);
  const [userBadges, setUserBadges] = useState([]);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        if (userId) {
          const response = await axios.get(`http://localhost:5000/api/badges/${userId}`);
          setAllBadges(response.data.badges);
          setUserBadges(response.data.userBadges);
        }
      } catch (error) {
        console.error('Error fetching badges:', error);
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
          <li key={badge._id} style={{ color: userBadges.includes(badge.badgeName) ? 'black' : 'gray' }}>
            <img 
              src={badge.icon} 
              alt={badge.badgeName} 
              style={{ filter: userBadges.includes(badge.badgeName) ? 'none' : 'grayscale(100%)', width: '50px', height: '50px' }}
            />
            <span>{badge.badgeName}: {badge.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Badges;
