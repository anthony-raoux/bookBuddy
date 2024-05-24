const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  totalPages: { type: Number, required: true },
  category: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true, enum: ['à lire', 'en cours de lecture', 'fini'] },
  lastPageRead: { type: Number, default: 0 }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
