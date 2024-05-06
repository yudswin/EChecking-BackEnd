const express = require("express");
const router = express.Router()
const courseController = require('../controllers/CourseController');

const { authLecturerMiddleWare } = require("../middlewares/authMiddleware");


router.post('/create/:id', authLecturerMiddleWare, courseController.createCourse) // cai nay 
router.get('/getAll/:lecturerId', authLecturerMiddleWare,  courseController.getAllCourse) // cai nay
router.get('/getDetails/:courseId', authLecturerMiddleWare, courseController.getDetails) // cai nay
router.put('/update/:courseId', authLecturerMiddleWare, courseController.updateCourse) // cai nay
// router.delete('/:id', courseController.deleteCourse)

module.exports = router