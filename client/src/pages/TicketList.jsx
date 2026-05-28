import { useState, useEffect } from 'react';
import API from '../api/axios';
import TicketCard from '../components/TicketCard';
import FilterBar from '../components/FilterBar';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    assignedTo: '',
  });

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      if (filters.assignedTo) params.assignedTo = filters.assignedTo;

      const res = await API.get('/tickets', { params });
      setTickets(res.data.tickets);
    } catch (err) {
      setError('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get('/users');
      setUsers(res.data.users);
    } catch (err) {
      console.error('Failed to load users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) return <div style={styles.center}>Loading tickets...</div>;
  if (error) return <div style={styles.center}>{error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>All Tickets</h1>
        <span style={styles.count}>{tickets.length} tickets</span>
      </div>

      <FilterBar
        filters={filters}
        onChange={handleFilterChange}
        users={users}
      />

      {tickets.length === 0 ? (
        <div style={styles.empty}>
          <p>🎫 No tickets found.</p>
          <p style={styles.emptySubtext}>
            Try clearing the filters or create a new ticket.
          </p>
        </div>
      ) : (
        tickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1e1e2e',
  },
  count: {
    color: '#6b7280',
    fontSize: '14px',
  },
  center: {
    textAlign: 'center',
    padding: '40px',
    color: '#6b7280',
  },
  empty: {
    textAlign: 'center',
    padding: '60px',
    color: '#6b7280',
    fontSize: '18px',
  },
  emptySubtext: {
    fontSize: '14px',
    marginTop: '8px',
  },
};

export default TicketList;