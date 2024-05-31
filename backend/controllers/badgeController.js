// controllers/badgeController.js
const Badge = require('../models/badge');

exports.getBadges = async (req, res) => {
  try {
    const allBadges = await Badge.find();
    res.status(200).json(allBadges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
