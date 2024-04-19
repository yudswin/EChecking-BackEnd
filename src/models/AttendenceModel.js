const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    studentID: {
        type: String, 
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Late'], 
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
