const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Add a user
router.post('/addUser', async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get user by ID
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user password
router.put('/updatePassword', async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;
  try {
    // Vérifier le mot de passe actuel de l'utilisateur avant de le mettre à jour
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.comparePassword(currentPassword)) {
      return res.status(400).json({ message: 'Mot de passe actuel incorrect' });
    }
    // Mettre à jour le mot de passe de l'utilisateur
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
