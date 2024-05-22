const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Nouveau champ pour l'URL de l'image
  totalPages: { type: Number, required: true }, // Nouveau champ pour le nombre total de pages
  status: { type: String, default: 'not read' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Book', bookSchema);
