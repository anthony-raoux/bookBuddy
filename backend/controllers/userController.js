const User = require('../models/user');
const Badge = require('../models/badge');

const addUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();

    // Attribuer le badge de première connexion
    await assignFirstSignInBadge(user._id);

    res.status(201).json({ message: 'User added successfully', user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
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

const updatePassword = async (req, res) => {
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

const assignBibliophileBadge = async (userId) => {
  try {
    const user = await User.findById(userId).populate('badges').populate('books');
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    if (user.books.length >= 1 && !user.badges.some(badge => badge.badgeName === 'Bibliophile')) {
      const bibliophileBadge = new Badge({ userId, badgeName: 'Bibliophile', description: 'Ajoutez votre 1er livre' });
      await bibliophileBadge.save();
      user.badges.push(bibliophileBadge);
      await user.save();
      console.log('Badge Bibliophile attribué');
    }
  } catch (error) {
    console.error('Erreur lors de l\'attribution du badge Bibliophile:', error);
  }
};

const assignFirstSignInBadge = async (userId) => {
  try {
    const user = await User.findById(userId).populate('badges');
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    if (user.badges.length === 0) {
      const firstSignInBadge = new Badge({ userId, badgeName: 'First Sign In', description: 'First sign in' });
      await firstSignInBadge.save();
      user.badges.push(firstSignInBadge);
      await user.save();
      console.log('Badge First Sign In attribué');
    }
  } catch (error) {
    console.error('Erreur lors de l\'attribution du badge First Sign In:', error);
  }
};


// Fonction pour attribuer un badge si l'utilisateur ajoute 5 livres en favoris
const assignStarsBadge = async (userId) => {
  try {
    const user = await User.findById(userId).populate('badges');
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    if (user.favoriteBooks.length >= 5 && !user.badges.some(badge => badge.badgeName === 'Stars')) {
      const starsBadge = new Badge({ userId, badgeName: 'Stars', description: 'Added 5 favorite books' });
      await starsBadge.save();
      user.badges.push(starsBadge);
      await user.save();
      console.log('Badge Stars attribué');
    }
  } catch (error) {
    console.error('Erreur lors de l\'attribution du badge Stars:', error);
  }
};

// Fonction pour attribuer un badge si l'utilisateur visite son profil 10 fois
const assignExplorerBadge = async (userId) => {
  try {
    const user = await User.findById(userId).populate('badges');
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    if (user.profileVisits >= 10 && !user.badges.some(badge => badge.badgeName === 'Explorer')) {
      const explorerBadge = new Badge({ userId, badgeName: 'Explorer', description: 'Visited profile 10 times' });
      await explorerBadge.save();
      user.badges.push(explorerBadge);
      await user.save();
      console.log('Badge Explorer attribué');
    }
  } catch (error) {
    console.error('Erreur lors de l\'attribution du badge Explorer:', error);
  }
};

// Exporter les fonctions pour les utiliser ailleurs
module.exports = {
  addUser,
  getUserById,
  updatePassword,
  assignBibliophileBadge,
  assignFirstSignInBadge,
  assignStarsBadge,
  assignExplorerBadge
};
