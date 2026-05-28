import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const CreateTicket = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignedTo: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get('/users');
        setUsers(res.data.users);
      } catch (err) {
        console.error('Failed to load users');
      }
    };
    fetchUsers();
  }, []);

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
      const res = await API.post('/tickets', formData);
      navigate(`/tickets/${res.data.ticket._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create New Ticket</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Title *</label>
            <input
              style={styles.input}
              type="text"
              name="title"
              placeholder="Brief summary of the issue"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description *</label>
            <textarea
              style={styles.textarea}
              name="description"
              placeholder="Detailed description of the issue..."
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
              onClick={() => navigate('/tickets')}
            >
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Creating...' : 'Create Ticket'}
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

export default CreateTicket;