const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
