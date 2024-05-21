const express = require('express');
const router = express.Router();
const User = require('../models/user');

// User login
router.post('/connexion', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user && user.password === req.body.password) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
