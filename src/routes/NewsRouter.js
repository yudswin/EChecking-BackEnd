const express = require("express");
const router = express.Router();
const newsController = require('../controllers/NewsController');
const { authLecturerMiddleWare } = require("../middlewares/authMiddleware");
const { authUserMiddleWare } = require("../middlewares/authMiddleware");

// 1. Check status
router.post('/check-news-status', newsController.checkNewsStatus);

// 2. Refresh news
router.post('/refresh-news', newsController.refreshNews);

// 3. Get 30 news
router.get('/get-news-list', newsController.getNewsList);

module.exports = router