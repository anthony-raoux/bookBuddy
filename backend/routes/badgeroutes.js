const express = require('express');
const router = express.Router();
const Badge = require('../models/badge');
const User = require('../models/user');

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const badges = await Badge.find();
    const user = await User.findById(userId).populate('badges');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userBadges = user.badges.map(badge => badge.badgeName);

    res.json({ badges, userBadges });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
