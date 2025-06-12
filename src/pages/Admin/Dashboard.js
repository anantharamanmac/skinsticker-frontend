import React from 'react';
import { Link } from 'react-router-dom';
import { BoxSeam, PeopleFill, ClipboardCheck } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const menuItems = [
    {
      title: 'Manage Products',
      to: '/admin/products',
      icon: <BoxSeam size={24} className="me-2" />,
      bg: 'primary',
    },
    {
      title: 'Manage Users',
      to: '/admin/users',
      icon: <PeopleFill size={24} className="me-2" />,
      bg: 'success',
    },
    {
      title: 'Approve Orders',
      to: '/admin/orders',
      icon: <ClipboardCheck size={24} className="me-2" />,
      bg: 'purple',
    },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5">Admin Dashboard</h2>
      <div className="row g-4">
        {menuItems.map((item, index) => (
          <div key={index} className="col-md-4">
            <Link to={item.to} className="text-decoration-none">
              <div
                className={`card text-white bg-${item.bg} h-100 shadow-sm border-0 hover-scale`}
              >
                <div className="card-body d-flex align-items-center justify-content-center">
                  {item.icon}
                  <h5 className="card-title m-0">{item.title}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
