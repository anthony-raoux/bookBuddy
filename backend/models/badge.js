const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
    userId: String,
    type: { type: String, enum: ['badge', 'other'] },
    badgeName: String,  // Nouveau champ pour le nom du badge
    description: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reward', rewardSchema);
