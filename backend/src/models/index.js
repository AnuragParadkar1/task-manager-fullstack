const { sequelize } = require('../utils/database');

const db = {};

db.sequelize = sequelize;

// When you create database models like User or Task, you will add them here.
// For example:
// db.User = require('./user.js')(sequelize);
// db.Task = require('./task.js')(sequelize);

module.exports = db;
