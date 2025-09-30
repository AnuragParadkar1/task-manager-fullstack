const { Task, User } = require('../models');
const { Op } = require('sequelize');

const taskService = {
  async getUserTasks(userId, filters = {}) {
    const { page = 1, limit = 10, status, priority, search } = filters;
    const offset = (page - 1) * limit;

    const whereClause = { userId };

    if (status) whereClause.status = status;
    if (priority) whereClause.priority = priority;
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { count, rows: tasks } = await Task.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']],
    });

    return {
      tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit),
      },
    };
  },

  async getTaskById(taskId, userId) {
    const task = await Task.findOne({
      where: { id: taskId, userId },
    });

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  },

  async createTask(taskData, userId) {
    const task = await Task.create({
      ...taskData,
      userId,
    });

    return task;
  },

  async updateTask(taskId, userId, updateData) {
    const task = await Task.findOne({
      where: { id: taskId, userId },
    });

    if (!task) {
      throw new Error('Task not found');
    }

    await task.update(updateData);
    return task;
  },

  async deleteTask(taskId, userId) {
    const task = await Task.findOne({
      where: { id: taskId, userId },
    });

    if (!task) {
      throw new Error('Task not found');
    }

    await task.destroy();
    return true;
  },
};

module.exports = taskService;
