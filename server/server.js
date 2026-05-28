const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/tickets', require('./routes/ticket.routes'));
app.use('/api/v1/tickets/:id/comments', require('./routes/comment.routes'));
app.use('/api/v1/users', require('./routes/user.routes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Ticket Management API is running' });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});