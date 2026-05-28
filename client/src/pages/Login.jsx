import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      const res = await API.post('/auth/login', formData);
      login(res.data.user, res.data.token);
      navigate('/tickets');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🎫 Welcome Back</h2>
        <p style={styles.subheading}>Login to your account</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={styles.linkText}>
          Don't have an account?{' '}
          <Link to="/signup" style={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1e1e2e',
    marginBottom: '4px',
    textAlign: 'center',
  },
  subheading: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '24px',
    fontSize: '14px',
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
  btn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '8px',
  },
  linkText: {
    textAlign: 'center',
    marginTop: '16px',
    fontSize: '14px',
    color: '#6b7280',
  },
  link: {
    color: '#4f46e5',
    textDecoration: 'none',
    fontWeight: '500',
  },
};

export default Login;