const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    studentID: {
        type: String,  // Or reference the Student model if you have it
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Late'], // You can customize statuses
        default: 'Absent'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance
