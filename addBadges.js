// addBadges.js
const mongoose = require('mongoose');
const Badge = require('./backend/models/badge');

mongoose.connect('mongodb://localhost:27017/BookBuddy', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');

    const badges = [
      {
        name: 'First Sign In',
        description: 'Awarded for signing up for the first time.',
        icon: 'https://cdn-icons-png.flaticon.com/128/744/744984.png', // Replace with actual URL
      },
      {
        name: 'Bibliophile',
        description: 'Awarded for adding 10 books to your collection.',
        icon: 'https://cdn-icons-png.flaticon.com/128/4072/4072307.png', // Replace with actual URL
      },
      {
        name: 'Stars',
        description: 'Ajoutez 5 livres en favoris.',
        icon: 'https://www.flaticon.com/fr/icone-gratuite/favori_6145576', // Replace with actual URL
      },
      {
        name: 'Explorer',
        description: 'Awarded for visiting your profile 10 times.',
        icon: 'https://www.flaticon.com/fr/icone-gratuite/boussole_12667455', // Replace with actual URL
      },
    ];

    Badge.insertMany(badges)
      .then(() => {
        console.log('Badges added successfully');
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error('Error adding badges:', error);
        mongoose.connection.close();
      });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
