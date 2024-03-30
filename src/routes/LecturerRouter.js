const express = require("express");
const router = express.Router();
const lecturerController = require('../controllers/LecturerController');
// const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

// CRUD - Create Review Update Delete
router.post('/CreateUser', lecturerController.createUser) // Create User
router.post('/CreateLecturer', lecturerController.createLecturer) // Create Lecturer
router.post('/Sign-in', lecturerController.loginLecturer)   //login
router.put('/Update-Lecturer/:id', lecturerController.updateLecturer)   // update user based on specified 'id' (using PUT)
// router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser) // delete user based on specified 'id' (using DELETE)
// router.get('/get-detail/:id', authUserMiddleWare, userController.getDetailUser)    // get one user
module.exports = router