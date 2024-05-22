// routes/index.js
const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');
const rewardController = require('../controllers/rewardController');
const authController = require('../controllers/authController');

// Routes pour les livres
router.post('/addBook', bookController.addBook);
router.get('/books', bookController.getAllBooks);
router.get('/book/:id', bookController.getBookById);
router.get('/book/:filtre', bookController.getBooksByFilter);
router.put('/book/:id', bookController.updateBook);
router.put('/book/status/:id', bookController.updateReadingStatus);
router.post('/book/:id/favorite', bookController.addToFavorites);
router.delete('/book/:id/favorite', bookController.removeFromFavorites);

// Routes pour les récompenses
router.post('/reward/:parametre', rewardController.gamify);

// Routes pour les utilisateurs
router.post('/addUser', userController.addUser);
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updatePassword);
router.post('/login', authController.login);

module.exports = router;
