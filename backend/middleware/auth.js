// Authentication middleware

module.exports = {
    // Check if user is authenticated
    isAuthenticated: (req, res, next) => {
      if (req.session.userId) {
        return next();
      }
      res.redirect('/admin/login');
    },
    
    // Check if user is admin
    isAdmin: (req, res, next) => {
      if (req.session.userId && req.session.isAdmin) {
        return next();
      }
      res.status(403).render('admin/error', { 
        message: 'Access denied. Admin privileges required.' 
      });
    }
  };