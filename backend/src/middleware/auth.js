const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config');
const logger = require('../utils/logger');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No valid token provided.',
      });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user?.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token or user not found.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token.',
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.',
      });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
