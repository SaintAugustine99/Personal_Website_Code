const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

// Auth routes
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Dashboard
router.get('/dashboard', isAuthenticated, isAdmin, postController.showDashboard);

// Post management routes
router.get('/posts/new', isAuthenticated, isAdmin, postController.showNewPostForm);
router.post('/posts', isAuthenticated, isAdmin, postController.createPost);
router.get('/posts/:id/edit', isAuthenticated, isAdmin, postController.showEditPostForm);
router.post('/posts/:id', isAuthenticated, isAdmin, postController.updatePost);
router.post('/posts/:id/delete', isAuthenticated, isAdmin, postController.deletePost);

module.exports = router;