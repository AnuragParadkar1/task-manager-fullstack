const { Task, User } = require('../models');
const { Op } = require('sequelize');
const logger = require('../utils/logger');

const getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority, search } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { userId: req.user.id };

    // Add filters
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

    res.json({
      success: true,
      data: {
        tasks,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: Math.ceil(count / limit),
        },
      },
    });
  } catch (error) {
    logger.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks',
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, userId: req.user.id },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
      data: { task },
    });
  } catch (error) {
    logger.error('Get task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch task',
    });
  }
};

const createTask = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      userId: req.user.id,
    };

    const task = await Task.create(taskData);

    logger.info(`Task created: ${task.id} by user: ${req.user.id}`);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: { task },
    });
  } catch (error) {
    logger.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create task',
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, userId: req.user.id },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    await task.update(req.body);

    logger.info(`Task updated: ${task.id} by user: ${req.user.id}`);

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: { task },
    });
  } catch (error) {
    logger.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update task',
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, userId: req.user.id },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    await task.destroy();

    logger.info(`Task deleted: ${id} by user: ${req.user.id}`);

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    logger.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete task',
    });
  }
};

// Admin only - get all tasks
const getAllTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: tasks } = await Task.findAndCountAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']],
    });

    res.json({
      success: true,
      data: {
        tasks,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: Math.ceil(count / limit),
        },
      },
    });
  } catch (error) {
    logger.error('Get all tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks',
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
};
