const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    unique: true
  },
  studentPassword: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number
  },
  studentID: {
    type: String,
    required: true,
    unique: true
  },
  dePartment: {
    type: String,
    required: true
  },
  birthDate: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
  },
},
{
  timestamps: true 
});

const User = mongoose.model('User', studentSchema);
module.exports = User
