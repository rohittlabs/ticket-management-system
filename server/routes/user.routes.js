const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getAllUsers, getMe } = require('../controllers/user.controller');

router.use(protect);

router.get('/', getAllUsers);
router.get('/me', getMe);

module.exports = router;