const Post = require('../models/Post');

// Helper function to create slug from title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

// Post controllers
exports.showDashboard = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.render('admin/dashboard', { posts });
  } catch (error) {
    console.error(error);
    res.status(500).render('admin/error', { 
      message: 'Error loading dashboard' 
    });
  }
};

exports.showNewPostForm = (req, res) => {
  res.render('admin/new-post', { error: null });
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, excerpt, tags, published } = req.body;
    
    // Create a slug from the title
    const slug = createSlug(title);
    
    // Check if slug already exists
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return res.render('admin/new-post', {
        error: 'A post with a similar title already exists',
        post: req.body
      });
    }
    
    // Process tags
    const tagArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
    
    await Post.create({
      title,
      slug,
      content,
      excerpt,
      tags: tagArray,
      published: published === 'on'
    });
    
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.render('admin/new-post', {
      error: 'Error creating post',
      post: req.body
    });
  }
};

exports.showEditPostForm = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).render('admin/error', { 
        message: 'Post not found' 
      });
    }
    
    res.render('admin/edit-post', { post, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).render('admin/error', { 
      message: 'Error loading post' 
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content, excerpt, tags, published } = req.body;
    const postId = req.params.id;
    
    // Process tags
    const tagArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
    
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).render('admin/error', { 
        message: 'Post not found' 
      });
    }
    
    // Update post
    post.title = title;
    post.content = content;
    post.excerpt = excerpt;
    post.tags = tagArray;
    post.published = published === 'on';
    post.updatedAt = Date.now();
    
    await post.save();
    
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).render('admin/edit-post', {
      post: { ...req.body, _id: req.params.id },
      error: 'Error updating post'
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).render('admin/error', { 
      message: 'Error deleting post' 
    });
  }
};

// Frontend controllers
exports.showAllPosts = async (req, res) => {
  try {
    // Only show published posts for public view
    const posts = await Post.find({ published: true }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching posts' });
  }
};

exports.showSinglePost = async (req, res) => {
  try {
    const post = await Post.findOne({ 
      slug: req.params.slug,
      published: true
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching post' });
  }
};