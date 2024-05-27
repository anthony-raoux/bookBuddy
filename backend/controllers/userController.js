// controllers/userController.js
const User = require('../models/user');
const Badge = require('../models/badge');

exports.addUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();

    // Attribuer le badge de première connexion
    await this.assignFirstSignInBadge(user._id);

    res.status(201).json({ message: 'User added successfully', user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('badges');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.password = req.body.password;
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fonction pour attribuer un badge si l'utilisateur a ajouté 10 livres
exports.assignBibliophileBadge = async (userId) => {
  try {
    const user = await User.findById(userId).populate('badges');
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    if (user.books.length >= 10 && !user.badges.some(badge => badge.name === 'Bibliophile')) {
      const bibliophileBadge = await Badge.findOne({ name: 'Bibliophile' });
      if (bibliophileBadge) {
        user.badges.push(bibliophileBadge);
        await user.save();
        console.log('Badge Bibliophile attribué');
      }
    }
  } catch (error) {
    console.error('Erreur lors de l\'attribution du badge Bibliophile:', error);
  }
};

// Fonction pour attribuer un badge si l'utilisateur s'inscrit pour la première fois
exports.assignFirstSignInBadge = async (userId) => {
  try {
    const user = await User.findById(userId).populate('badges');
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    if (user.badges.length === 0) {
      const firstSignInBadge = await Badge.findOne({ name: 'First Sign In' });
      if (firstSignInBadge) {
        user.badges.push(firstSignInBadge);
        await user.save();
        console.log('Badge First Sign In attribué');
      }
    }
  } catch (error) {
    console.error('Erreur lors de l\'attribution du badge First Sign In:', error);
  }
};

// Fonction pour attribuer un badge si l'utilisateur ajoute 5 livres en favoris
exports.assignStarsBadge = async (userId) => {
  try {
    const user = await User.findById(userId).populate('badges');
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    if (user.favoriteBooks.length >= 5 && !user.badges.some(badge => badge.name === 'Stars')) {
      const starsBadge = await Badge.findOne({ name: 'Stars' });
      if (starsBadge) {
        user.badges.push(starsBadge);
        await user.save();
        console.log('Badge Stars attribué');
      }
    }
  } catch (error) {
    console.error('Erreur lors de l\'attribution du badge Stars:', error);
  }
};

// Fonction pour attribuer un badge si l'utilisateur visite son profil 10 fois
exports.assignExplorerBadge = async (userId) => {
  try {
    const user = await User.findById(userId).populate('badges');
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    if (user.profileVisits >= 10 && !user.badges.some(badge => badge.name === 'Explorer')) {
      const explorerBadge = await Badge.findOne({ name: 'Explorer' });
      if (explorerBadge) {
        user.badges.push(explorerBadge);
        await user.save();
        console.log('Badge Explorer attribué');
      }
    }
  } catch (error) {
    console.error('Erreur lors de l\'attribution du badge Explorer:', error);
  }
};
