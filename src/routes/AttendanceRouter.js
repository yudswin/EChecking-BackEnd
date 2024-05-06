const express = require("express");
const router = express.Router()
const attendanceController = require('../controllers/AttendanceController');

const { authLecturerMiddleWare } = require("../middlewares/authMiddleware");

router.post('/create/:courseId', attendanceController.createAttentdance) 
router.get('/getAll/:courseId', authLecturerMiddleWare, attendanceController.getAllAttendance) // cai nay
router.get('/getDetails/:sessionId',authLecturerMiddleWare, attendanceController.getDetails) // cai nay
router.put('/update/:sessionId', attendanceController.updateAttendance)
router.put('/resetCode/:sessionId', attendanceController.resetCode)
router.get('/getDetailsByCode/:code', attendanceController.getDetailsByCode)

module.exports = router