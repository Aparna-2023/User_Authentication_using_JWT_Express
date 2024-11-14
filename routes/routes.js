const express = require('express');
const authController = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/admin', authMiddleware.verifyToken, authMiddleware.checkRole('admin'), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

module.exports = router;
