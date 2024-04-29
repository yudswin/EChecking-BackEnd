const express = require("express");
const router = express.Router()
const attendanceController = require('../controllers/AttendanceController');

router.post('/create/:courseId', attendanceController.createAttentdance) 
router.get('/getAll/:courseId', attendanceController.getAllAttendance)
router.get('/getDetails/:sessionId', attendanceController.getDetails)

module.exports = router