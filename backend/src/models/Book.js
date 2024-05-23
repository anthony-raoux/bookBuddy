const mongoose = require('mongoose');
    
    const bookSchema = new mongoose.Schema({
        title: { type: String, required: true },
        author: { type: String, required: true },
        image: { type: String },
        status: { type: String, enum: ['to_read', 'reading', 'finished'], default: 'to_read' },
        pages: { type: Number, required: true },
        category: { type: String, required: true },
        isFavorite: { type: Boolean, default: false },
        currentPage: { type: Number, default: 0 }
    });

const Book = mongoose.model('Book', bookSchema, 'Livres');

module.exports = Book;