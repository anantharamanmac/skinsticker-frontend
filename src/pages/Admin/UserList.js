import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get('/admin/users', {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        showToast('Failed to fetch users', 'danger');
      }
    };

    if (user?.token) {
      fetchUsers();
    }
  }, [user, showToast]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });
        setUsers(users.filter((u) => u._id !== id));
        showToast('User deleted successfully', 'success');
      } catch (err) {
        console.error('Failed to delete user:', err.response?.data || err.message);
        showToast('Failed to delete user', 'danger');
      }
    }
  };

  const handleMakeAdmin = async (id) => {
    try {
      await API.put(`/admin/users/${id}`, { role: 'admin' }, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      setUsers(users.map(u => u._id === id ? { ...u, role: 'admin' } : u));
      showToast('User promoted to admin', 'success');
    } catch (err) {
      console.error('Failed to promote user:', err.response?.data || err.message);
      showToast('Failed to promote user', 'danger');
    }
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">User Management</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                  {user.role !== 'admin' && (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="edit-button"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="no-users">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
