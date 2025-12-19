import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/admin.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const token = localStorage.getItem('token');
    
    if (!userData || userData.role !== 'admin' || !token) {
      navigate('/login');
      return;
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.status === 'success') {
        setUsers(data.data.users);
      }
    } catch (err) {
      console.log('Error fetching users:', err);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/v1/auth/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        setMessage('User deleted successfully');
        fetchUsers();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      setMessage('Error deleting user');
    }
  };

  const blockUser = async (userId) => {
    if (!window.confirm('Block this user for 1 day?')) return;
    
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/v1/auth/users/${userId}/block`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        setMessage('User blocked for 1 day');
        fetchUsers();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      setMessage('Error blocking user');
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
      
      {message && <p className="message">{message}</p>}
      
      <div className="users-table">
        <h3>Manage Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isBlocked ? (
                    <span className="blocked">
                      Blocked until {user.blockedUntil ? new Date(user.blockedUntil).toLocaleDateString() : 'N/A'}
                    </span>
                  ) : (
                    <span className="active">Active</span>
                  )}
                </td>
                <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                <td>
                  {user.role !== 'admin' && (
                    <div className="actions">
                      <button 
                        onClick={() => blockUser(user._id)} 
                        className="block-btn"
                        disabled={user.isBlocked}
                      >
                        Block
                      </button>
                      <button 
                        onClick={() => deleteUser(user._id)} 
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;