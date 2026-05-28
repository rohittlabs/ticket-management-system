import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import Login from './pages/Login';
import Signup from './pages/Signup';
import TicketList from './pages/TicketList';
import TicketDetail from './pages/TicketDetail';
import CreateTicket from './pages/CreateTicket';
import EditTicket from './pages/EditTicket';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/tickets" element={
            <ProtectedRoute><TicketList /></ProtectedRoute>
          } />
          <Route path="/tickets/new" element={
            <ProtectedRoute><CreateTicket /></ProtectedRoute>
          } />
          <Route path="/tickets/:id" element={
            <ProtectedRoute><TicketDetail /></ProtectedRoute>
          } />
          <Route path="/tickets/:id/edit" element={
            <ProtectedRoute><EditTicket /></ProtectedRoute>
          } />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/tickets" replace />}/>
          <Route path="*" element={<Navigate to="/tickets" replace />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;