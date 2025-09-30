const { Sequelize } = require('sequelize');
const config = require('../config'); // CORRECTED PATH
const logger = require('./logger');

const sequelize = new Sequelize(config.DATABASE_URL, {
  dialect: 'postgres',
  logging: (msg) => logger.info(msg),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connected successfully');

    if (config.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      logger.info('Database synchronized');
    }
  } catch (error) {
    logger.error('Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
