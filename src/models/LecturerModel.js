const mongoose = require('mongoose')

const lecturerSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        lecturerID: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    });

const Lecturer = mongoose.model("Lecturer", lecturerSchema)
module.exports = Lecturer;