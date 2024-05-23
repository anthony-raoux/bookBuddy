const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Assurez-vous que le chemin est correct

// Route pour ajouter un livre
router.post('/addBook', async (req, res) => {
    const newBook = new Book(req.body);
    try {
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour obtenir tous les livres
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour obtenir un livre spécifique
router.get('/book/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour mettre à jour le statut du livre
router.put('/book/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour mettre à jour la page actuelle d'un livre
router.put('/book/status/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { currentPage: req.body.currentPage }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour ajouter un livre aux favoris
router.post('/book/:id/favorite', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { isFavorite: true }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour supprimer un livre des favoris
router.delete('/book/:id/favorite', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { isFavorite: false }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
