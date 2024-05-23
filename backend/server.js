const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bookRoutes = require('./src/routes/bookRoutes'); // Assurez-vous que le chemin est correct
const userRoutes = require('./src/routes/userRoutes'); // Assurez-vous que le chemin est correct

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = 'mongodb://127.0.0.1:27017/bookbuddy'; // URL de la base de données MongoDB

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connexion réussie à MongoDB');
  })
  .catch(err => {
    console.log('Aucune connexion à MongoDB', err);
  });

// Utilisez vos routes
app.use('/api', bookRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
