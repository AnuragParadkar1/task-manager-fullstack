const rateLimit = require('express-rate-limit');
const config = require('../config');
const logger = require('../utils/logger');

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS, // 15 minutes by default
  max: config.RATE_LIMIT_MAX_REQUESTS, // 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Too many requests from this IP, please try again later.',
    });
  },
});

// Strict rate limiter for authentication routes (prevent brute force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Only 5 requests per 15 minutes
  message: {
    success: false,
    message: 'Too many login attempts, please try again after 15 minutes.',
  },
  skipSuccessfulRequests: true, // Don't count successful requests
  handler: (req, res) => {
    logger.warn(`Auth rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Too many login attempts, please try again after 15 minutes.',
    });
  },
});

// Rate limiter for task creation (prevent spam)
const createLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 task creations per minute
  message: {
    success: false,
    message: 'Too many tasks created, please slow down.',
  },
  handler: (req, res) => {
    logger.warn(`Create rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Too many tasks created, please slow down.',
    });
  },
});

module.exports = {
  apiLimiter,
  authLimiter,
  createLimiter,
};
