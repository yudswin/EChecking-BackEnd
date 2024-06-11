const express = require("express");
const router = express.Router()

const StudentController = require('../controllers/StudentController');
const { authUserMiddleWare } = require("../middlewares/authMiddleware");

// CRUD - Create Review Update Delete
router.post('/signin', StudentController.loginStudent) //  login of Student
router.put('/update/:id', authUserMiddleWare, StudentController.updateStudent)
router.post('/logout', StudentController.logoutStudent);
router.post('/create', StudentController.createStudent);
router.post('/refreshToken',  StudentController.refreshToken)
router.get('/getDetails/:id', authUserMiddleWare, StudentController.getDetails)
router.get('/getAll', StudentController.getAllStudents) 
router.post('/forgotPassword', StudentController.forgotPassword) 
router.post('/verifyOtp', StudentController.verifyOtp); 
router.post('/changePassword', StudentController.changePassword); 

module.exports = router