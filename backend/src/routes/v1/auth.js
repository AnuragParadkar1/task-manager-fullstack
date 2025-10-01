const express = require('express');
const authController = require('../../controllers/authController');

const router = express.Router();

// This route will handle POST requests to /api/v1/auth/register
// It uses the 'register' function from the authController
router.post('/register', authController.register);

// This route will handle POST requests to /api/v1/auth/login
// It uses the 'login' function from the authController
router.post('/login', authController.login);

module.exports = router;
