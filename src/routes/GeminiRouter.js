const express = require("express");
const router = express.Router();
const TextController = require('../controllers/TextController');

router.post('/summarize', TextController.summarizeText);

module.exports = router;