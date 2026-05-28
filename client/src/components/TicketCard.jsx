import { Link } from 'react-router-dom';

const priorityColors = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
};

const statusColors = {
  open: '#3b82f6',
  in_progress: '#f59e0b',
  done: '#22c55e',
};

const TicketCard = ({ ticket }) => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <Link to={`/tickets/${ticket._id}`} style={styles.title}>
          {ticket.title}
        </Link>
        <div style={styles.badges}>
          <span style={{ ...styles.badge, backgroundColor: priorityColors[ticket.priority] }}>
            {ticket.priority.toUpperCase()}
          </span>
          <span style={{ ...styles.badge, backgroundColor: statusColors[ticket.status] }}>
            {ticket.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      <p style={styles.description}>
        {ticket.description.length > 100
          ? ticket.description.substring(0, 100) + '...'
          : ticket.description}
      </p>

      <div style={styles.footer}>
        <span style={styles.meta}>
          👤 {ticket.assignedTo ? ticket.assignedTo.name : 'Unassigned'}
        </span>
        <span style={styles.meta}>
          🕒 {new Date(ticket.createdAt).toLocaleDateString()}
        </span>
        <span style={styles.meta}>
          Created by: {ticket.createdBy?.name}
        </span>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px',
    flexWrap: 'wrap',
    gap: '8px',
  },
  title: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e1e2e',
    textDecoration: 'none',
  },
  badges: {
    display: 'flex',
    gap: '8px',
  },
  badge: {
    color: 'white',
    padding: '2px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
  },
  description: {
    color: '#6b7280',
    fontSize: '14px',
    marginBottom: '12px',
  },
  footer: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  meta: {
    fontSize: '13px',
    color: '#9ca3af',
  },
};

export default TicketCard;