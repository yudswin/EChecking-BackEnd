const mongoose = require('mongoose')

const lecturerSchema = new mongoose.Schema(
    
    {
        lecturerName: { type: String, required: true },
        lecturerPassword: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        phone: { type: Number, required: true },
        birthday: { type: Date, required: true },
        gender: { type: mongoose.Schema.Types.Binary, required: true },
        department: { type: String, required: true }
    },
    {
        timestamps: true // have the time to create and update
    }
);

const Lecturer = mongoose.model("Lecturer", lecturerSchema)
module.exports = Lecturer;