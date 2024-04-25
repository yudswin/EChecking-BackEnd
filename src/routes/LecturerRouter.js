const express = require("express");
const router = express.Router();
const lecturerController = require('../controllers/LecturerController');
// const { authLecturerMiddleWare } = require("../middlewares/authMiddleware");


// CRUD - Create Review Update Delete
router.post('/Create', lecturerController.createLecturer) // Create Lecturer
router.post('/Sign-in', lecturerController.loginLecturer)   //login
router.post('/Log-out', lecturerController.logoutLecturer)
router.put('/Update/:id', lecturerController.updateLecturer)   // update Lecturer based on specified 'id' (using PUT)
router.post('/refresh-token',  lecturerController.refreshToken)

// router.delete('/Delete/:id', authLecturerMiddleWare, lecturerController.deleteLecturer) // delete Lecturer based on specified 'id' (using DELETE)
// router.get('/Get-Lecturer-Detail/:id', authLecturerMiddleWare, lecturerController.getLecturerDetail)    // get one lecturer
// router.get('/Get-Lecturer-Name/:id', lecturerController.getLecturerName)    // get one lecturer


module.exports = router