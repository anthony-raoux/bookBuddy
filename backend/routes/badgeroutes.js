// routes/badgeRoutes.js
const express = require('express');
const router = express.Router();
const Badge = require('../models/badge');
const User = require('../models/user');

// Endpoint to get badges for a specific user
router.get('/api/badges/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const allBadges = await Badge.find(); // All badges in the collection
        const user = await User.findById(userId).populate('badges');
        const userBadges = user.badges.map(badge => badge.badgeName); // Only badge names

        res.json({ badges: allBadges, userBadges });
    } catch (err) {
        console.error('Error fetching badges:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
