const Book = require('../models/book');

exports.addBook = async (req, res) => {
  try {
    const { title, author, imageUrl, status, totalPages, category, userId } = req.body;
    console.log('Received data:', req.body); // Ajoutez ceci pour vérifier les données reçues
    const book = new Book({ title, author, imageUrl, status, totalPages, category, userId });
    const savedBook = await book.save();
    res.status(201).json({ message: 'Livre ajouté avec succès', book: savedBook });
  } catch (err) {
    console.error('Error saving book:', err); // Ajoutez ceci pour vérifier les erreurs
    res.status(400).json({ message: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBooksByFilter = async (req, res) => {
  try {
    const filter = req.params.filtre;
    const books = await Book.find({ category: filter });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    Object.assign(book, req.body);
    await book.save();
    res.json({ message: 'Book updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReadingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, lastPageRead } = req.body; // Ajoutez lastPageRead à partir du corps de la requête
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.status = status;
    if (status === 'en cours de lecture') {
      book.lastPageRead = lastPageRead; // Mettez à jour lastPageRead si le statut est 'en cours de lecture'
    }
    await book.save();
    res.json({ message: 'Reading status updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToFavorites = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.favorite = true;
    await book.save();
    res.json({ message: 'Book added to favorites' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromFavorites = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.favorite = false;
    await book.save();
    res.json({ message: 'Book removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
