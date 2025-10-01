const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/auth');

function authMiddleware(req, res, next) {
  // Get token from Authorization header: "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided. Access denied.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // attach decoded payload to req.user
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
}

module.exports = authMiddleware;
