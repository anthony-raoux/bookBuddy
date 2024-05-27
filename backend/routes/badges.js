// routes/badges.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Badge = require('../models/badge');

// Attribuer un badge à un utilisateur
router.post('/assign', async (req, res) => {
  try {
    const { userId, badgeId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const badge = await Badge.findById(badgeId);
    if (!badge) {
      return res.status(404).json({ message: 'Badge non trouvé' });
    }

    user.badges.push(badge);
    await user.save();

    res.status(200).json({ message: 'Badge attribué avec succès' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Récupérer les badges d'un utilisateur
router.get('/:userId/badges', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('badges');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ badges: user.badges });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
