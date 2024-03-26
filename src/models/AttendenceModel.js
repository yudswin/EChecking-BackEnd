const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    studentID: {
        type: String,
        required: true
    },
    joinedAt: {
        type: Date,
        required: true
    },
    leaveAt: {
        type: Date,
        required: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Attendance', newAttendanceSchema);
