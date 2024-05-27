// models/badge.js
const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }, // URL de l'icône du badge
});

module.exports = mongoose.model('Badge', badgeSchema);
