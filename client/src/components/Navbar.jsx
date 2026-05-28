import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/tickets" style={styles.logo}>
        🎫 Ticket Manager
      </Link>

      <div style={styles.right}>
        {user && (
          <>
            <span style={styles.userInfo}>
              👤 {user.name} ({user.role})
            </span>
            <Link to="/tickets/new" style={styles.createBtn}>
              + New Ticket
            </Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#1e1e2e',
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  userInfo: {
    fontSize: '14px',
    color: '#ccc',
  },
  createBtn: {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
  },
  logoutBtn: {
    backgroundColor: 'transparent',
    color: '#ccc',
    border: '1px solid #ccc',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default Navbar;