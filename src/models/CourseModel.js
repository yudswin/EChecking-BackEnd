const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    // need unique code for each course
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lecturerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecturer',
        required: true
    }
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;