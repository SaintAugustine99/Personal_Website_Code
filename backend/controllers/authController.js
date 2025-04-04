const User = require('../models/User');

// Authentication controller
exports.showLogin = (req, res) => {
  res.render('admin/login', { 
    title: 'Login',
    error: null 
  });
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.render('admin/login', { 
        title: 'Login',
        error: 'Invalid credentials' 
      });
    }
    
    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.render('admin/login', { 
        title: 'Login',
        error: 'Invalid credentials' 
      });
    }
    
    // Set session
    req.session.userId = user._id;
    req.session.isAdmin = user.isAdmin;
    
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.render('admin/login', { 
      title: 'Login',
      error: 'Server error, please try again' 
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/admin/dashboard');
    }
    res.redirect('/admin/login');
  });
};

// Create initial admin user (run this only once)
exports.createAdminUser = async () => {
  try {
    const adminCount = await User.countDocuments({ isAdmin: true });
    
    if (adminCount === 0) {
      await User.create({
        username: 'admin',
        password: 'adminpassword', // Change this immediately after first login
        isAdmin: true
      });
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};