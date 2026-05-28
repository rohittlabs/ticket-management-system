const Ticket = require('../models/Ticket');

// @POST /api/v1/tickets - Create a ticket
const createTicket = async (req, res) => {
  try {
    const { title, description, priority, assignedTo } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const ticket = await Ticket.create({
      title,
      description,
      priority: priority || 'medium',
      status: 'open',
      createdBy: req.user._id,
      assignedTo: assignedTo || null,
    });

    // Populate createdBy and assignedTo fields
    await ticket.populate('createdBy', 'name email role');
    await ticket.populate('assignedTo', 'name email role');

    res.status(201).json({
      message: 'Ticket created successfully',
      ticket,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @GET /api/v1/tickets - Get all tickets with filters
const getAllTickets = async (req, res) => {
  try {
    const { status, priority, assignedTo } = req.query;

    // Build filter object dynamically
    const filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;

    const tickets = await Ticket.find(filter)
      .populate('createdBy', 'name email role')
      .populate('assignedTo', 'name email role')
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      count: tickets.length,
      tickets,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @GET /api/v1/tickets/:id - Get single ticket details
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('createdBy', 'name email role')
      .populate('assignedTo', 'name email role');

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ ticket });

  } catch (error) {
    // Handle invalid MongoDB ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @PATCH /api/v1/tickets/:id - Update ticket
const updateTicket = async (req, res) => {
  try {
    const { title, description, priority, status, assignedTo } = req.body;

    // Find ticket first
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Update only fields that were sent
    if (title) ticket.title = title;
    if (description) ticket.description = description;
    if (priority) ticket.priority = priority;
    if (status) ticket.status = status;
    if (assignedTo !== undefined) ticket.assignedTo = assignedTo || null;

    await ticket.save();

    await ticket.populate('createdBy', 'name email role');
    await ticket.populate('assignedTo', 'name email role');

    res.status(200).json({
      message: 'Ticket updated successfully',
      ticket,
    });

  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @DELETE /api/v1/tickets/:id - Delete ticket
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    await ticket.deleteOne();

    res.status(200).json({ message: 'Ticket deleted successfully' });

  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};