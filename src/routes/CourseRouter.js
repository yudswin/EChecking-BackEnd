const express = require("express");
const router = express.Router()
const courseController = require('../controllers/CourseController');

router.post('/create/:id', courseController.createCourse) 
// router.get('/all', courseController.getAllCourses)
router.get('/:id', courseController.getCourse)
// router.put('/:id', courseController.updateCourse)
// router.delete('/:id', courseController.deleteCourse)

module.exports = router