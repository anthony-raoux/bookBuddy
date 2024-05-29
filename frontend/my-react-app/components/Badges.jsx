import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Badges = ({ userId }) => {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const fetchBadges = async () => {
      if (userId) {
        const response = await axios.get(`http://localhost:5000/api/badges/${userId}`);
        setBadges(response.data);
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
        {badges.map((badge) => (
          <li key={badge._id}>
            {badge.badgeName}: {badge.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Badges;
