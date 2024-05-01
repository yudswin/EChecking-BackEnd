const express = require("express");
const router = express.Router()
const attendanceController = require('../controllers/AttendanceController');

router.post('/create/:courseId', attendanceController.createAttentdance) 
router.get('/getAll/:courseId', attendanceController.getAllAttendance)
router.get('/getDetails/:sessionId', attendanceController.getDetails)
router.put('/update/:sessionId', attendanceController.updateAttendance)
router.put('/resetCode/:sessionId', attendanceController.resetCode)
router.get('/getDetailsByCode/:code', attendanceController.getDetailsByCode)

module.exports = router