require('dotenv').config();

// 1. Environment variables and constants should come first
const config = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
};

// 2. Dependencies
const express = require('express');
const authRoutes = require('../routes/v1/auth');

// 3. Router initialization
const router = express.Router();

// 4. Mount routes
router.use('/auth', authRoutes);

// 5. Export both config and router
module.exports = {
  ...config,
  router,
};
