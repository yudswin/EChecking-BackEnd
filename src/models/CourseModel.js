const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseID: {
        type: String,
        required: true,
    },
    lecturerID: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    sessions: [
        {
            sessionID: {
                type: String,
                required: true,
            },
        },
    ],
    students: [
        {
            studentID: {
                type: String,
                required: true,
            },
        },
    ],
});
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
