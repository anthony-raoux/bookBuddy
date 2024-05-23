const express = require('express');
const router = express.Router();
const User = require('../models/Users'); // Assurez-vous que le chemin est correct

// Route pour ajouter un utilisateur
router.post('/addUser', async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour obtenir tous les utilisateurs
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour obtenir un utilisateur spécifique
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour mettre à jour un utilisateur
router.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour ajouter un utilisateur aux favoris (exemple)
router.post('/users/:id/favorite', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { isFavorite: true }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour supprimer un utilisateur des favoris (exemple)
router.delete('/users/:id/favorite', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { isFavorite: false }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
