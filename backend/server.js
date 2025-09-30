require('dotenv').config();

const app = require('./src/app');
const config = require('./src/config');
const logger = require('./src/utils/logger');

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
