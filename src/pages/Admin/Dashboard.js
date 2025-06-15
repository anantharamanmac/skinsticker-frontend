import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BoxSeam, PeopleFill, ClipboardCheck, Tools } from 'react-bootstrap-icons';
import API from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await API.get('/settings/maintenance');
        setMaintenanceMode(res.data.maintenanceMode);
      } catch (err) {
        console.error('Failed to fetch maintenance status', err);
      }
    };
    fetchStatus();
  }, []);

  const toggleMaintenance = async () => {
    try {
      setLoading(true);
      const res = await API.put('/settings/maintenance', {
        maintenanceMode: !maintenanceMode,
      });
      setMaintenanceMode(res.data.maintenanceMode);
    } catch (err) {
      console.error('Failed to toggle maintenance', err);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      title: 'Manage Products',
      to: '/admin/products',
      icon: <BoxSeam size={26} className="me-2" />,
    },
    {
      title: 'Manage Users',
      to: '/admin/users',
      icon: <PeopleFill size={26} className="me-2" />,
    },
    {
      title: 'Approve Orders',
      to: '/admin/orders',
      icon: <ClipboardCheck size={26} className="me-2" />,
    },
  ];

  return (
    <div className="admin-dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <div className="dashboard-grid">
        {menuItems.map((item, index) => (
          <Link to={item.to} key={index} className="dashboard-card-link">
            <div className="dashboard-card">
              {item.icon}
              <span>{item.title}</span>
            </div>
          </Link>
        ))}
        <div className="dashboard-card toggle-maintenance" onClick={toggleMaintenance}>
          <Tools size={26} className="me-2" />
          <span>{loading ? 'Toggling...' : (maintenanceMode ? 'Disable' : 'Enable')} Maintenance</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
