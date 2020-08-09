const mongoose = require('mongoose');


const Assignment = mongoose.model('Assignment', new mongoose.Schema({
    title: String,
    total: String,
    courseId: String 
}));

// AssignmentScore.methods.getId = function() {
//     return this._id;
// }


exports.Assignment = Assignment;
// exports.AssignmentSchema = assignment;
