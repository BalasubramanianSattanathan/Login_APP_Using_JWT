const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

// Middleware
// Use cors middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy user data
const users = [
  { id: 1, username: 'admin', password: 'admin', role: 'admin' },
  { id: 2, username: 'user', password: 'user', role: 'user' },
  { id: 3, username: 'bala', password: 'bala', role: 'Bala' }
];

// Login endpoint
app.post('/api/login', (req, res) => {
  // Mock user authentication
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Generate a JWT token with user payload
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Username or password incorrect');
  }
});

// Protected endpoint
app.get('/api/userinfo', authenticateToken, (req, res) => {
  res.json(req.user);
});

// Middleware function to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, 'secretkey', (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
