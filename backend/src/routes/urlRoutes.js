const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

// API endpoints
router.post('/encode', urlController.encodeUrl);
router.post('/decode', urlController.decodeUrl);
router.get('/statistic/:url_path', urlController.getUrlStats);
router.get('/list', urlController.getAllUrls);
router.get('/search', urlController.searchUrls);

// Redirect endpoint
router.get('/:url_path', urlController.redirectToOriginalUrl);

module.exports = router;