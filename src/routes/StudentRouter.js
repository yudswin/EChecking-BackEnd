const express = require("express");
const router = express.Router()
const StudentController = require('../controllers/StudentController');
// const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

// CRUD - Create Review Update Delete
router.post('/sign-in', StudentController.loginStudent) //  login of Student
router.put('/update user/:id', StudentController.updateStudent)
router.post('/login', StudentController.logoutStudent);
router.post('/create', StudentController.createStudent);
router.post('/refresh-token',  StudentController.refreshToken)
module.exports = router
