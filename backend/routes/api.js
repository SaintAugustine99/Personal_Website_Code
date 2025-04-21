const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// API routes to fetch posts for the frontend
router.get('/posts', postController.showAllPosts);
router.get('/posts/:slug', postController.showSinglePost);

// Handle contact form submissions
router.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Here you would typically send an email or save to database
    // For now, we'll just acknowledge receipt
    res.json({ success: true, message: 'Your message has been received.' });
  });
  

module.exports = router;