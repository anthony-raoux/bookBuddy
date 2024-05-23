const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userMail: { type: String, required: true },
    userPassword: { type: String }
});

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;
