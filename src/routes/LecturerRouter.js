const express = require("express");
const router = express.Router();
const lecturerController = require('../controllers/LecturerController');
const { authLecturerMiddleWare } = require("../middlewares/authMiddleware");


// CRUD - Create Review Update Delete
router.post('/create', lecturerController.createLecturer) // Create Lecturer
router.post('/signin', lecturerController.loginLecturer)   //login
router.post('/logout', lecturerController.logoutLecturer)
router.put('/update/:id',authLecturerMiddleWare,  lecturerController.updateLecturer)   
router.post('/refresh-token',  lecturerController.refreshToken)

// router.delete('/Delete/:id', authLecturerMiddleWare, lecturerController.deleteLecturer) // delete Lecturer based on specified 'id' (using DELETE)
router.get('/getDetails/:id', authLecturerMiddleWare, lecturerController.getDetails)    // get one lecturer
// router.get('/Get-Lecturer-Name/:id', lecturerController.getLecturerName)    // get one lecturer


module.exports = router