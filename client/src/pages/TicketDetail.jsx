import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import CommentSection from '../components/CommentSection';

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

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ticketRes, commentsRes] = await Promise.all([
          API.get(`/tickets/${id}`),
          API.get(`/tickets/${id}/comments`),
        ]);
        setTicket(ticketRes.data.ticket);
        setComments(commentsRes.data.comments);
      } catch (err) {
        setError('Ticket not found');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await API.delete(`/tickets/${id}`);
      navigate('/tickets');
    } catch (err) {
      setError('Failed to delete ticket');
    } finally {
      setDeleting(false);
    }
  };

  const handleCommentAdded = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  if (loading) return <div style={styles.center}>Loading...</div>;
  if (error) return <div style={styles.center}>{error}</div>;
  if (!ticket) return <div style={styles.center}>Ticket not found</div>;

  return (
    <div style={styles.container}>
      <div style={styles.backRow}>
        <button onClick={() => navigate('/tickets')} style={styles.backBtn}>
          ← Back to Tickets
        </button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to={`/tickets/${id}/edit`} style={styles.editBtn}>
            ✏️ Edit Ticket
          </Link>
          {!confirmDelete ? (
            <button style={styles.deleteBtn} onClick={() => setConfirmDelete(true)}>
              🗑️ Delete
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                style={styles.confirmDeleteBtn}
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
              <button
                style={styles.cancelDeleteBtn}
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={styles.card}>
        <h1 style={styles.title}>{ticket.title}</h1>

        <div style={styles.badges}>
          <span style={{ ...styles.badge, backgroundColor: priorityColors[ticket.priority] }}>
            {ticket.priority.toUpperCase()}
          </span>
          <span style={{ ...styles.badge, backgroundColor: statusColors[ticket.status] }}>
            {ticket.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        <div style={styles.meta}>
          <div style={styles.metaItem}>
            <span style={styles.metaLabel}>Created By</span>
            <span style={styles.metaValue}>{ticket.createdBy?.name}</span>
          </div>
          <div style={styles.metaItem}>
            <span style={styles.metaLabel}>Assigned To</span>
            <span style={styles.metaValue}>
              {ticket.assignedTo ? ticket.assignedTo.name : 'Unassigned'}
            </span>
          </div>
          <div style={styles.metaItem}>
            <span style={styles.metaLabel}>Created At</span>
            <span style={styles.metaValue}>
              {new Date(ticket.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div style={styles.metaItem}>
            <span style={styles.metaLabel}>Last Updated</span>
            <span style={styles.metaValue}>
              {new Date(ticket.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div style={styles.description}>
          <h3 style={styles.descHeading}>Description</h3>
          <p style={styles.descText}>{ticket.description}</p>
        </div>
      </div>

      <CommentSection
        ticketId={id}
        comments={comments}
        onCommentAdded={handleCommentAdded}
      />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '24px',
  },
  center: {
    textAlign: 'center',
    padding: '40px',
    color: '#6b7280',
  },
  backRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  backBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#4f46e5',
    cursor: 'pointer',
    fontSize: '14px',
    padding: 0,
  },
  editBtn: {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
  },
  card: {
    backgroundColor: 'white',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: '24px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1e1e2e',
    marginBottom: '16px',
  },
  badges: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
  },
  badge: {
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
  },
  meta: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    marginBottom: '24px',
  },
  metaItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  metaLabel: {
    fontSize: '12px',
    color: '#9ca3af',
    fontWeight: '500',
  },
  metaValue: {
    fontSize: '14px',
    color: '#1e1e2e',
    fontWeight: '500',
  },
  description: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '20px',
  },
  descHeading: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e1e2e',
    marginBottom: '8px',
  },
  descText: {
    color: '#4b5563',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  deleteBtn: {
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  confirmDeleteBtn: {
    backgroundColor: '#dc2626',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  cancelDeleteBtn: {
    backgroundColor: 'white',
    color: '#6b7280',
    padding: '8px 16px',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default TicketDetail;