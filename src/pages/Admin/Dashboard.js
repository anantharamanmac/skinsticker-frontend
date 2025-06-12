import React from 'react';
import { Link } from 'react-router-dom';
import { BoxSeam, PeopleFill, ClipboardCheck } from 'react-bootstrap-icons';
import './Dashboard.css'; // ✅ Custom CSS import

const Dashboard = () => {
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
      </div>
    </div>
  );
};

export default Dashboard;
