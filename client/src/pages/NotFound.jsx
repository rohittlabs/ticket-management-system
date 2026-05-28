import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.code}>404</h1>
        <h2 style={styles.heading}>Page Not Found</h2>
        <p style={styles.message}>
          The page you are looking for does not exist or has been moved.
        </p>
        <div style={styles.buttons}>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate('/tickets')}
          >
            Go to Tickets
          </button>
          <button
            style={styles.secondaryBtn}
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
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
    padding: '48px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  code: {
    fontSize: '72px',
    fontWeight: 'bold',
    color: '#4f46e5',
    margin: '0 0 8px 0',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1e1e2e',
    marginBottom: '12px',
  },
  message: {
    color: '#6b7280',
    fontSize: '14px',
    marginBottom: '32px',
    lineHeight: '1.6',
  },
  buttons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  primaryBtn: {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '10px 24px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  secondaryBtn: {
    backgroundColor: 'white',
    color: '#6b7280',
    padding: '10px 24px',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default NotFound;