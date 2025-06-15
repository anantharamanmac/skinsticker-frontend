// pages/Maintenance.js
import React from 'react';

const Maintenance = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  }}>
    <h1 style={{ fontSize: '3rem', color: '#333' }}>🚧 Site Under Maintenance</h1>
    <p style={{ fontSize: '1.2rem', color: '#666' }}>
      We are currently performing maintenance. Please check back soon.
    </p>
  </div>
);

export default Maintenance;
