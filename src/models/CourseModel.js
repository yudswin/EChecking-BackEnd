const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    attendances: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Record'
    }],
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;