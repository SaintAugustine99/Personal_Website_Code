const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// API routes to fetch posts for the frontend
router.get('/posts', postController.showAllPosts);
router.get('/posts/:slug', postController.showSinglePost);

module.exports = router;