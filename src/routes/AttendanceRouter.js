const express = require("express");
const router = express.Router()
const attendanceController = require('../controllers/AttendanceController');

router.post('/create/:courseId', attendanceController.createAttentdance) 
// router.get('/getAll/:lecturerId', courseController.getAllCourse)
// router.get('/getDetails/:courseId', courseController.getDetails)
// router.put('/update/:courseId', courseController.updateCourse)
// router.delete('/:id', courseController.deleteCourse)

module.exports = router