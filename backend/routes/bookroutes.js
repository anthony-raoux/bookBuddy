const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Add a book
router.post('/', async (req, res) => {
  const { title, author, imageUrl, status, totalPages, category, userId } = req.body;
  console.log('Received data:', req.body); // Vérifiez les données reçues
  const newBook = new Book({ title, author, imageUrl, status, totalPages, category, userId });
  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error('Error saving book:', err); // Vérifiez les erreurs
    res.status(400).json({ message: err.message });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get filtered books
router.get('/filter/:filter', async (req, res) => {
  try {
    const filter = req.params.filter;
    const books = await Book.find({ title: new RegExp(filter, 'i') });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update book status
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update current page
router.put('/status/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, { currentPage: req.body.currentPage }, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add book to favorites
router.post('/favorite/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, { isFavorite: true }, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Remove book from favorites
router.delete('/favorite/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, { isFavorite: false }, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
