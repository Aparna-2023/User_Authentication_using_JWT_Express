const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { Role } = require('../models');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'Token is required' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.checkRole = requiredRole => async (req, res, next) => {
  try {
    const userRole = await Role.findByPk(req.user.roleId);
    if (userRole.name !== requiredRole) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
