const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtSecret, jwtExpiresIn, bcryptRounds } = require('../config/auth');

const router = express.Router();

// ---------------- REGISTER ----------------
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, bcryptRounds);

    // Normally: save user to DB here
    // For now, return mock response
    res.status(201).json({
      message: 'User registered successfully',
      user: { username, passwordHash: hashedPassword },
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ---------------- LOGIN ----------------
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Normally: fetch user from DB
    // Fake demo user
    const fakeUser = {
      id: 1,
      username: 'test',
      passwordHash: await bcrypt.hash('123456', bcryptRounds),
    };

    if (username !== fakeUser.username) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, fakeUser.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: fakeUser.id, username: fakeUser.username },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );

    res.json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
