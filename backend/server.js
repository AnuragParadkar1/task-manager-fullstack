require('dotenv').config();

const express = require('express');
const app = express();
const { router, ...config } = require('./src/config');
const logger = require('./src/utils/logger');

// Apply middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount router with /api prefix
app.use('/api', router);

const server = app.listen(config.PORT, () => {
  logger.info(`🚀 Task Manager API running on port ${config.PORT}`);
  logger.info(`📚 API Documentation: http://localhost:${config.PORT}/api-docs`);
  logger.info(`🏥 Health Check: http://localhost:${config.PORT}/health`);
  logger.info(`🌍 Environment: ${config.NODE_ENV}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
  });
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  server.close(() => {
    process.exit(1);
  });
});
