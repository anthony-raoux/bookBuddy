const express = require('express');
const router = express.Router();
const Badge = require('../models/badge'); // Assuming you have a Badge model

// Get all badges
router.get('/', async (req, res) => {
  try {
    const badges = await Badge.find();
    res.json(badges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
