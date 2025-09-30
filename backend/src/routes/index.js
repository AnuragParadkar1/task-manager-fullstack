const express = require('express');
const v1Routes = require('./v1');

const router = express.Router();

// API v1 routes
router.use('/v1', v1Routes);

// API version info
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Task Manager API',
    version: 'v1',
    endpoints: {
      auth: '/api/v1/auth',
      tasks: '/api/v1/tasks',
      docs: '/api-docs',
    },
  });
});

module.exports = router;
