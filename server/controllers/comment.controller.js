const Comment = require('../models/Comment');
const Ticket = require('../models/Ticket');

// @POST /api/v1/tickets/:id/comments - Add comment to ticket
const addComment = async (req, res) => {
  try {
    const { body } = req.body;

    if (!body) {
      return res.status(400).json({ message: 'Comment body is required' });
    }

    // Check if ticket exists
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const comment = await Comment.create({
      ticketId: req.params.id,
      userId: req.user._id,
      body,
    });

    await comment.populate('userId', 'name email role');

    res.status(201).json({
      message: 'Comment added successfully',
      comment,
    });

  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @GET /api/v1/tickets/:id/comments - Get all comments for a ticket
const getComments = async (req, res) => {
  try {
    // Check if ticket exists
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const comments = await Comment.find({ ticketId: req.params.id })
      .populate('userId', 'name email role')
      .sort({ createdAt: 1 }); // oldest first

    res.status(200).json({
      count: comments.length,
      comments,
    });

  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @DELETE /api/v1/tickets/:id/comments/:commentId - Delete a comment
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Only comment owner can delete
    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await comment.deleteOne();

    res.status(200).json({ message: 'Comment deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { addComment, getComments, deleteComment };