import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'open',
    assignedTo: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ticketRes, usersRes] = await Promise.all([
          API.get(`/tickets/${id}`),
          API.get('/users'),
        ]);

        const ticket = ticketRes.data.ticket;
        setFormData({
          title: ticket.title,
          description: ticket.description,
          priority: ticket.priority,
          status: ticket.status,
          assignedTo: ticket.assignedTo?._id || '',
        });
        setUsers(usersRes.data.users);
      } catch (err) {
        setError('Failed to load ticket');
      } finally {
        setFetchLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description) {
      setError('Title and description are required');
      return;
    }

    try {
      setLoading(true);
      await API.patch(`/tickets/${id}`, formData);
      navigate(`/tickets/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update ticket');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div style={styles.center}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Edit Ticket</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Title *</label>
            <input
              style={styles.input}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description *</label>
            <textarea
              style={styles.textarea}
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
            />
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Priority</label>
              <select
                style={styles.input}
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Status</label>
              <select
                style={styles.input}
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Assign To</label>
              <select
                style={styles.input}
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
              >
                <option value="">Unassigned</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={styles.buttons}>
            <button
              type="button"
              style={styles.cancelBtn}
              onClick={() => navigate(`/tickets/${id}`)}
            >
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '24px',
  },
  center: {
    textAlign: 'center',
    padding: '40px',
    color: '#6b7280',
  },
  card: {
    backgroundColor: 'white',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1e1e2e',
    marginBottom: '24px',
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#ef4444',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '14px',
  },
  field: {
    marginBottom: '16px',
    flex: 1,
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  row: {
    display: 'flex',
    gap: '16px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '24px',
  },
  cancelBtn: {
    padding: '10px 24px',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#6b7280',
  },
  submitBtn: {
    padding: '10px 24px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#4f46e5',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default EditTicket;