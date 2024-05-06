const express = require("express");
const router = express.Router()
const courseController = require('../controllers/CourseController');

router.post('/create/:id', courseController.createCourse) // cai nay 
router.get('/getAll/:lecturerId', courseController.getAllCourse) // cai nay
router.get('/getDetails/:courseId', courseController.getDetails) // cai nay
router.put('/update/:courseId', courseController.updateCourse) // cai nay
// router.delete('/:id', courseController.deleteCourse)

module.exports = router