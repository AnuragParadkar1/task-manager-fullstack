module.exports = {
  // Database connection URL from .env file
  DATABASE_URL: process.env.DATABASE_URL,

  // Port for the server to run on, with a default of 5000
  PORT: process.env.PORT || 5000,

  // Node environment, with a default of 'development'
  NODE_ENV: process.env.NODE_ENV || 'development',
};
