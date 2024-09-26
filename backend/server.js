const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Database setup
const db = new sqlite3.Database('./teachers.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS teachers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      className TEXT NOT NULL,
      department TEXT NOT NULL,
      subjects TEXT NOT NULL,
      image TEXT
    )`);
  }
});

// Passport configuration
passport.use(new GoogleStrategy({
    clientID: 'Ov23liRc1COTIDe523zr',
    clientSecret: '182f0d5f91aebd7da82e759f1fec353978ce1e9d',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // Here you would typically find or create a user in your database
    // For this example, we'll just pass the profile information
    return cb(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// OAuth routes
app.get('/auth/github',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/github/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// Middleware to check if user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Not authenticated' });
}

// Apply ensureAuthenticated middleware to protected routes
app.get('/teachers', (req, res) => {
  // Now you can access user info via req.user
  
  db.all('SELECT * FROM teachers', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Transform the image path to a full URL
    const teachersWithImageUrls = rows.map(teacher => ({
      ...teacher,
      image: teacher.image ? `http://localhost:${port}/${teacher.image}` : null
    }));
    res.json(teachersWithImageUrls);
  });
});

// POST / route to add a student
app.post('/addteacher', upload.single('image'), (req, res) => {
  const { name, className, department, subjects } = req.body;
  const image = req.file ? req.file.path : null;
  
  if (!name || !className || !department || !subjects) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const sql = `INSERT INTO teachers (name, className, department, subjects, image) VALUES (?, ?, ?, ?, ?)`;
  
  db.run(sql, [name, className, department, subjects, image], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "Teachers added successfully",
      id: this.lastID
    });
  });
});

// Route to get current user's info
app.get('/me', ensureAuthenticated, (req, res) => {
  res.json({
    id: req.user.id,
    displayName: req.user.displayName,
    email: req.user.emails[0].value
    // Add any other user properties you want to expose
  });
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
