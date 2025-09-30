const logger = require('../utils/logger');
const config = require('../config');

const errorHandler = (err, req, res, next) => {
  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors,
    });
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      success: false,
      message: 'Record already exists',
      error: config.NODE_ENV === 'development' ? err.message : undefined,
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired',
    });
  }

  // Default error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: config.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = { errorHandler };
