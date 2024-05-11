const express = require("express");
const router = express.Router()
const recordController = require('../controllers/RecordController');
const upload = require('../middlewares/upload')

router.post('/create/:sessionId', upload.array('submissionPath[]')  , recordController.createRecord)
router.get('/getAll/:sessionId', recordController.getAllRecord)



module.exports = router