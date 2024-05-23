const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Remplacez 'bcrypt' par 'bcryptjs'
const User = require('../models/user');

// Inscription
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    res.status(200).json({ message: 'Connexion réussie', userId: user._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
