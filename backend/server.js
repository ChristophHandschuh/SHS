const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const axios = require("axios");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;
const CLIENT_ID = "fb51977a-b42a-4905-84a9-5df79cb0d3fb";
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const MICROSOFT_TOKEN_URL = "https://login.microsoftonline.com/190dcb4f-6bec-43c6-b761-484429dbf536/oauth2/v2.0/token";

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));

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
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      className TEXT NOT NULL,
      department TEXT NOT NULL,
      subjects TEXT NOT NULL,
      image TEXT
    )`);
  }
});

// Route to get all teachers
app.get('/teachers', (req, res) => {
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
    console.log(teachersWithImageUrls);
    res.json(teachersWithImageUrls);
  });
});

// Updated route to get teachers info
app.get('/getteacher', (req, res) => {
  db.all('SELECT * FROM teachers WHERE id = ?', [req.query.id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Transform the image path to a full URL
    const teachersWithImageUrls = rows.map(teacher => ({
      ...teacher,
      image: teacher.image ? `http://localhost:${port}/${teacher.image}` : null
    }));
    res.json(teachersWithImageUrls[0] || []);
  });
});

// POST / route to add a teacher
app.post('/addteacher', upload.single('image'), (req, res) => {
  const { id, name, className, department, subjects } = req.body;
  const image = req.file ? req.file.path : null;
  
  if (!id || !name || !className || !department || !subjects) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  // Check if the ID already exists
  db.get('SELECT id FROM teachers WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (row) {
      if(image){
        const updateSql = `UPDATE teachers SET name = ?, className = ?, department = ?, subjects = ?, image = ? WHERE id = ?`;
        db.run(updateSql, [name, className, department, subjects, image, id], function(err) {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json({
            message: "Teacher updated successfully",
            id: id
          });
        });
      }
      else{
        const updateSql = `UPDATE teachers SET name = ?, className = ?, department = ?, subjects = ? WHERE id = ?`;
        db.run(updateSql, [name, className, department, subjects, id], function(err) {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json({
            message: "Teacher updated successfully",
            id: id
          });
        });
      }
    } else {
      const insertSql = `INSERT INTO teachers (id, name, className, department, subjects, image) VALUES (?, ?, ?, ?, ?, ?)`;
      db.run(insertSql, [id, name, className, department, subjects, image], function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          message: "Teacher added successfully",
          id: this.lastID
        });
      });
    }
  });
});

app.get("/oauth/redirect", (req, res) => {
  if(req.query.code){
    axios({
      method: "POST",
      url: MICROSOFT_TOKEN_URL,
      data: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: "authorization_code",
        scope: "user.read",//"api://fb51977a-b42a-4905-84a9-5df79cb0d3fb/.default"
        redirect_uri: "http://localhost:3000/oauth/redirect"
      },
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
    }).then((response) => {
      console.log(response.data);
      res.redirect(
        `http://localhost:5173?access_token=${response.data.access_token}`
      );
    });
  }
  else{
    res.redirect(
      `http://localhost:5173?access_token=${req.query.access_token}`
    );
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
