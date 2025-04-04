module.exports = function(req, res, next) {
    // Function to render a page with the layout
    res.renderWithLayout = function(view, options = {}) {
      // Add layout to options
      options.layout = options.layout || 'admin/layout';
      
      // Add title if not provided
      options.title = options.title || 'Admin Panel';
      
      // Render the view
      res.render(view, options);
    };
    
    next();
  };