const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts'); // ADD THIS LINE
const connectDB = require('./config/db');
const authController = require('./controllers/authController');

// Import routes
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Set up EJS view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'admin/layout'); // Default layout
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

// Session middleware
app.use(session({
  secret: 'your_secret_key', // Change this to a random string in production
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/personal_website',
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Make session data available to all templates
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Routes
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../')));

// Default route - serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Create admin user on startup
authController.createAdminUser();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});