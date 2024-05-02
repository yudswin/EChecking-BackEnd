const express = require("express");
const router = express.Router()
const recordController = require('../controllers/RecordController');

router.post('/create/:sessionId', recordController.createRecord)
// router.get('/getAll/:sessionId', recordController.getAllRecord)



module.exports = router