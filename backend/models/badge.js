// models/badge.js
const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
    userId: String,
    type: { type: String, enum: ['badge', 'other'] },
    badgeName: String,
    description: String,
    date: { type: Date, default: Date.now },
    earned: { type: Boolean, default: false }  // Nouveau champ
});

module.exports = mongoose.model('Reward', rewardSchema);
