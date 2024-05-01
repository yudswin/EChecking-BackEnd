const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    joinedHistory: [
        {
            studentID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
                required: true
            },
            joinedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    type: {
        type: String,
        enum: ['Normal', 'Quiz'],
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    quiz: {
    type: String,
    required: function() {
        return this.type === 'Quiz';
    }
}
}, {
    timestamps: true
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance
