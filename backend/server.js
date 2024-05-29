const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/BookBuddy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB', err);
});

// Routes
const bookRoutes = require('./routes/bookroutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const badgeRoutes = require('./routes/badgeroutes');       // Route corrigée pour les badges
const gamificationRoutes = require('./routes/gamification'); // Route de gamification

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/badges', badgeRoutes);           // Utilisation de la route des badges
app.use('/api/gamification', gamificationRoutes); // Utilisation de la route de gamification

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
