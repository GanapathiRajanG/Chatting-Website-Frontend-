import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/admin.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!userData || !userData.isAdmin) {
      navigate('/login');
      return;
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = () => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(allUsers);
  };

  const deleteUser = (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = allUsers.filter(user => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    setUsers(updatedUsers);
    setMessage('User deleted successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  const blockUser = (userId) => {
    if (!window.confirm('Block this user for 1 day?')) return;
    
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = allUsers.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
      const blockedUntil = new Date();
      blockedUntil.setDate(blockedUntil.getDate() + 1);
      
      allUsers[userIndex].isBlocked = true;
      allUsers[userIndex].blockedUntil = blockedUntil.toISOString();
      
      localStorage.setItem('users', JSON.stringify(allUsers));
      setUsers(allUsers);
      setMessage('User blocked for 1 day');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
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
              <tr key={user.id}>
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
                <td>{new Date().toLocaleDateString()}</td>
                <td>
                  {!user.isAdmin && (
                    <div className="actions">
                      <button 
                        onClick={() => blockUser(user.id)} 
                        className="block-btn"
                        disabled={user.isBlocked}
                      >
                        Block
                      </button>
                      <button 
                        onClick={() => deleteUser(user.id)} 
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