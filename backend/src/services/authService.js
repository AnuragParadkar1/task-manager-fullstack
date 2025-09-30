const { User } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

const authService = {
  async registerUser(userData) {
    const existingUser = await User.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = await User.create(userData);
    const token = generateToken(user.id);

    return { user, token };
  },

  async loginUser(email, password) {
    const user = await User.findOne({ where: { email, isActive: true } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user.id);

    return { user, token };
  },
};

module.exports = authService;
