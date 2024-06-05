const express = require("express");
const router = express.Router()
const courseController = require('../controllers/CourseController');

const { authLecturerMiddleWare } = require("../middlewares/authMiddleware");


router.post('/create/:id', authLecturerMiddleWare, courseController.createCourse) 
router.get('/getAll/:lecturerId', authLecturerMiddleWare,  courseController.getAllCourse) 
router.get('/getDetails/:courseId', authLecturerMiddleWare, courseController.getDetails) 
router.put('/update/:courseId', authLecturerMiddleWare, courseController.updateCourse) 
router.get('/getCourseName/:courseId', courseController.getCourseName)
router.delete('/delete/:id',authLecturerMiddleWare, courseController.deleteCourse)

module.exports = router
