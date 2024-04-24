const express = require("express");
const router = express.Router()
const courseController = require('../controllers/CourseController');

router.post('/create/:id', courseController.createCourse) 
router.get('/getAll/:lecturerId', courseController.getAllCourse)
router.get('/getDetail/:courseId', courseController.getDetails)
// router.put('/:id', courseController.updateCourse)
// router.delete('/:id', courseController.deleteCourse)

module.exports = router