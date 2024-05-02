const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    sessionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    studentID: {
        type: String,
        required: true
    },
    submissionPath: {
        type: String
    }
}, {
    timestamps: true
});

const Record = mongoose.model('Record', recordSchema);
module.exports = Record
