const Joi = require('joi');
const logger = require('../utils/logger');

const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorDetails = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      logger.warn('Validation error:', errorDetails);

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorDetails,
      });
    }

    req[property] = value;
    next();
  };
};

// Validation schemas
const schemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(128).required(),
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  createTask: Joi.object({
    title: Joi.string().min(1).max(200).required(),
    description: Joi.string().max(1000).optional(),
    priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
    dueDate: Joi.date().iso().optional(),
  }),

  updateTask: Joi.object({
    title: Joi.string().min(1).max(200).optional(),
    description: Joi.string().max(1000).optional(),
    status: Joi.string().valid('todo', 'in_progress', 'completed').optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional(),
    dueDate: Joi.date().iso().optional(),
  }),
};

module.exports = { validate, schemas };
