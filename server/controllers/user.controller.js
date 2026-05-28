const User = require('../models/User');

// @GET /api/v1/users - Get all users (for assignee dropdown)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ name: 1 });

    res.status(200).json({
      count: users.length,
      users,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @GET /api/v1/users/me - Get logged in user profile
const getMe = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllUsers, getMe };