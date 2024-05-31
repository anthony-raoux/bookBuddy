const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
    name: String,
    description: String,
    icon: String,
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Badge', badgeSchema);
