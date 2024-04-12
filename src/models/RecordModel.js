const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    joinTime: {
        type: Date,
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

const Record = mongoose.model('Record', studentSchema);
module.exports = Record
