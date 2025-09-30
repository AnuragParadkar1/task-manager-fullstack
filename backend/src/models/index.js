const User = require('./user');
const Task = require('./Task');

// Define associations
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  User,
  Task,
};
