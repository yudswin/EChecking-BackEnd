const express = require("express");
const router = express.Router()
const StudentController = require('../controllers/Studentcontroller');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

// CRUD - Create Review Update Delete
router.post('/sign-in', Studentcontroller.loginStudent) //  login of Student
router.put('/update user/:id',authUserMiddleWare, Studentcontroller.updateStudent)
router.post('/login', Studentcontroller.logoutStudent);
router.post('/create', StudentController.createStudent);
router.post('/refresh-token',  StudentController.refreshToken)
module.exports = router
