const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    // 1. Check if token exists in header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // 2. Extract token
    const token = authHeader.split(' ')[1];

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Find user and attach to request
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protect };