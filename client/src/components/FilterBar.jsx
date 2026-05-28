const FilterBar = ({ filters, onChange, users }) => {
  return (
    <div style={styles.container}>
      <select
        style={styles.select}
        value={filters.status}
        onChange={(e) => onChange('status', e.target.value)}
      >
        <option value="">All Status</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select
        style={styles.select}
        value={filters.priority}
        onChange={(e) => onChange('priority', e.target.value)}
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select
        style={styles.select}
        value={filters.assignedTo}
        onChange={(e) => onChange('assignedTo', e.target.value)}
      >
        <option value="">All Assignees</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <button
        style={styles.clearBtn}
        onClick={() => {
          onChange('status', '');
          onChange('priority', '');
          onChange('assignedTo', '');
        }}
      >
        Clear Filters
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '24px',
    alignItems: 'center',
  },
  select: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  clearBtn: {
    padding: '8px 16px',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    backgroundColor: 'white',
    cursor: 'pointer',
    color: '#6b7280',
  },
};

export default FilterBar;