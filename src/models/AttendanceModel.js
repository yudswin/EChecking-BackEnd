const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
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
