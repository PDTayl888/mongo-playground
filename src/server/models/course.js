const mongoose = require('mongoose');

const Course = mongoose.model('Course', new mongoose.Schema({
    title: String
}));

exports.Course = Course;


