const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { Role } = require('../models');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ error: 'Token is required' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'Token is required' });

  try {
    console.log(token, 'token', JWT_SECRET, 'jwt');    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('token error', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};


exports.checkRole = requiredRole => async (req, res, next) => {
  try {
    console.log(req.user.roleId,'Role');
    
    const userRole = await Role.findByPk(req.user.roleId);
    console.log(userRole,'userRole');
    
    if (userRole.name !== requiredRole) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
