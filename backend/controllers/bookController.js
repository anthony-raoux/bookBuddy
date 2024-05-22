const Book = require('../models/book');

exports.addBook = async (req, res) => {
  try {
    const { title, author, imageUrl, status, totalPages, category, userId } = req.body; // Mettre à jour les noms de propriété selon les champs envoyés par le frontend
    const book = new Book({ title, author, imageUrl, status, totalPages, category, userId }); // Mettre à jour les noms de propriété ici également
    await book.save();
    res.status(201).json({ message: 'Livre ajouté avec succès', book });
  } catch (err) {
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
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.status = req.body.status;
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
