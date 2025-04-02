const express = require("express");
const router = express.Router();
const webHook = require('../middlewares/webHook');

router.post('/sepayNotify', webHook.handleSePay);
module.exports = router
