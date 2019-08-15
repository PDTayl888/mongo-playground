const mongoose = require('mongoose');

const Student = mongoose.model('Student', new mongoose.Schema({
    name: String,
    courseId: String
}));

exports.Student = Student;