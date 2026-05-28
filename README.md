# 🎫 Developer Ticket Management System

A full-stack ticket management application for development teams to track bugs, features, and tasks.

---

## Features

- ✅ User Signup & Login (JWT Authentication)
- ✅ Create tickets with title, description, priority, and assignee
- ✅ View all tickets with filtering by status, priority, and assignee
- ✅ View ticket details with full description and metadata
- ✅ Edit ticket status, priority, and assignee
- ✅ Add and view comments on tickets
- ✅ Responsive and clean UI

---

## Tech Stack

| Layer      | Technology              |
|------------|------------------------|
| Frontend   | React.js + Vite        |
| Backend    | Node.js + Express.js   |
| Database   | MongoDB Atlas (Cloud)  |
| ODM        | Mongoose               |
| Auth       | JWT + bcryptjs         |
| Styling    | Inline CSS             |

---

## Project Structure
ticket-management-system/
├── client/ # React Frontend
│ └── src/
│ ├── api/ # Axios instance
│ ├── components/ # Reusable UI components
│ ├── context/ # Auth context
│ └── pages/ # Page components
├── server/ # Express Backend
│ ├── config/ # Database connection
│ ├── controllers/ # Request handlers
│ ├── middleware/ # Auth middleware
│ ├── models/ # Mongoose schemas
│ └── routes/ # API routes
└── README.md

text


---

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (free tier)
- Git

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ticket-management-system
2. Setup Backend
Bash

cd server
npm install
Create a .env file in the server folder:

env

PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ticket_management?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_make_this_long_and_random_123456
JWT_EXPIRES_IN=24h
Start the backend:

Bash

npm run dev
Server will run on http://localhost:5000

3. Setup Frontend
Open a new terminal:

Bash

cd client
npm install
npm run dev
Frontend will run on http://localhost:5173

4. Open the App
Go to http://localhost:5173 in your browser.

API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/v1/auth/signup	Create new account
POST	/api/v1/auth/login	Login user
Tickets (Protected)
Method	Endpoint	Description
GET	/api/v1/tickets	Get all tickets
POST	/api/v1/tickets	Create a ticket
GET	/api/v1/tickets/:id	Get ticket details
PATCH	/api/v1/tickets/:id	Update a ticket
DELETE	/api/v1/tickets/:id	Delete a ticket
Comments (Protected)
Method	Endpoint	Description
GET	/api/v1/tickets/:id/comments	Get ticket comments
POST	/api/v1/tickets/:id/comments	Add a comment
Users (Protected)
Method	Endpoint	Description
GET	/api/v1/users	Get all users
GET	/api/v1/users/me	Get my profile
Screenshots
(Add screenshots of your app here)

Author
Your Name

text


---

### Step 2 — Create .gitignore Files

#### Root folder — `.gitignore`
node_modules/
.env

text


#### `server/.gitignore`
node_modules/
.env

text


#### `client/.gitignore`
node_modules/
dist/

text


---

### Step 3 — Push to GitHub

```bash
cd ticket-management-system
git init
git add .
git commit -m "Initial commit - Ticket Management System MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ticket-management-system.git
git push -u origin main
Replace YOUR_USERNAME with your actual GitHub username