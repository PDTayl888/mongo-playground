const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    displayName: String,
    uid: String
}));

exports.User = User;