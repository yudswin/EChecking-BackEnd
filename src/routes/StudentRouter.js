const express = require("express");
const router = express.Router()

const StudentController = require('../controllers/StudentController');
const { authUserMiddleWare } = require("../middlewares/authMiddleware");

// CRUD - Create Review Update Delete
router.post('/signin', StudentController.loginStudent) //  login of Student
router.put('/update/:id', authUserMiddleWare, StudentController.updateStudent)
router.post('/logout', StudentController.logoutStudent);
router.post('/create', StudentController.createStudent);
router.post('/refresh-token',  StudentController.refreshToken)
router.get('/getDetails/:id', authUserMiddleWare, StudentController.getDetails)

module.exports = router