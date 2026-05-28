const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticket.controller');

// All routes are protected
router.use(protect);

router.route('/')
  .get(getAllTickets)
  .post(createTicket);

router.route('/:id')
  .get(getTicketById)
  .patch(updateTicket)
  .delete(deleteTicket);

module.exports = router;