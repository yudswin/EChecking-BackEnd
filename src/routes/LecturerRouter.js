const express = require("express");
const router = express.Router()
const lecturerController = require('../controllers/LecturerController');
// const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

// CRUD - Create Review Update Delete
router.post('/create', lecturerController.createUser) // Create
module.exports = router