const express = require('express');
const authRoutes = require('./auth.js');
const taskRoutes = require('./tasks.js');
const userRoutes = require('./users.js');

const router = express.Router();

// Mount all v1 routes
router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);

module.exports = router;
