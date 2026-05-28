const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Updated CORS - allow both local and production frontend
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://ticket-management-system-rosy.vercel.app/',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests
app.use(express.json());

app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/tickets', require('./routes/ticket.routes'));
app.use('/api/v1/tickets/:id/comments', require('./routes/comment.routes'));
app.use('/api/v1/users', require('./routes/user.routes'));

app.get('/', (req, res) => {
  res.json({ message: 'Ticket Management API is running' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});