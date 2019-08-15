const mongoose = require('mongoose');

const AssignmentScore = mongoose.model('AssignmentScore', new mongoose.Schema({
    assignmentId: String,
    studentId: String,
    courseId: String,
    score: Number
}));

exports.AssignmentScore = AssignmentScore;