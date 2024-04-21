const express = require("express");
const router = express.Router()
const lecturerController = require('../controllers/Studentcontroller');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

// CRUD - Create Review Update Delete
router.post('/sign-in', Studentcontroller.loginStudent) //  login of Student
router.put('/update user/:id',authUserMiddleWare, Studentcontroller.updateStudent)
router.post('/login', Studentcontroller.logoutStudent);

module.exports = router
