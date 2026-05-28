import { useState } from 'react';
import API from '../api/axios';

const CommentSection = ({ ticketId, comments, onCommentAdded }) => {
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await API.post(`/tickets/${ticketId}/comments`, { body });
      onCommentAdded(res.data.comment);
      setBody('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Comments ({comments.length})</h3>

      {comments.length === 0 && (
        <p style={styles.empty}>No comments yet. Be the first to comment!</p>
      )}

      <div style={styles.commentsList}>
        {comments.map((comment) => (
          <div key={comment._id} style={styles.comment}>
            <div style={styles.commentHeader}>
              <span style={styles.commentAuthor}>
                👤 {comment.userId?.name}
              </span>
              <span style={styles.commentDate}>
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
            <p style={styles.commentBody}>{comment.body}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h4 style={styles.formHeading}>Add a Comment</h4>
        {error && <p style={styles.error}>{error}</p>}
        <textarea
          style={styles.textarea}
          placeholder="Write your comment here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
        />
        <button type="submit" style={styles.btn} disabled={loading}>
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '32px',
  },
  heading: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#1e1e2e',
  },
  empty: {
    color: '#9ca3af',
    fontSize: '14px',
    marginBottom: '16px',
  },
  commentsList: {
    marginBottom: '24px',
  },
  comment: {
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '10px',
  },
  commentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '6px',
  },
  commentAuthor: {
    fontWeight: '600',
    fontSize: '14px',
    color: '#1e1e2e',
  },
  commentDate: {
    fontSize: '12px',
    color: '#9ca3af',
  },
  commentBody: {
    fontSize: '14px',
    color: '#4b5563',
    margin: 0,
  },
  form: {
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
  },
  formHeading: {
    fontSize: '16px',
    marginBottom: '12px',
    color: '#1e1e2e',
  },
  error: {
    color: '#ef4444',
    fontSize: '14px',
    marginBottom: '8px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    resize: 'vertical',
    marginBottom: '12px',
    boxSizing: 'border-box',
  },
  btn: {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default CommentSection;