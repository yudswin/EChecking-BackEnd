const express = require("express");
const router = express.Router()
const recordController = require('../controllers/RecordController');
const upload = require('../middlewares/upload');
const { multerErrorHandlingMiddleware } = require("../middlewares/authMiddleware");

router.post('/create/:sessionId', upload.array('submissionPath[]'), multerErrorHandlingMiddleware, recordController.createRecord)
router.get('/getAll/:sessionId', recordController.getAllRecord)
router.post('/createNormal/:sessionId', recordController.createNormal)
router.get('/total/:sessionId', recordController.getTotalRecord)
router.get('/totalDistinct/:sessionId', recordController.getTotalDistinctRecord)
router.get('/download', recordController.downloadFile)



module.exports = router