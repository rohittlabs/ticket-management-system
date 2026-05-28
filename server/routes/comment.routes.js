const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access :id from ticket route
const { protect } = require('../middleware/authMiddleware');
const {
  addComment,
  getComments,
  deleteComment,
} = require('../controllers/comment.controller');

// All routes are protected
router.use(protect);

router.route('/')
  .get(getComments)
  .post(addComment);

router.route('/:commentId')
  .delete(deleteComment);

module.exports = router;