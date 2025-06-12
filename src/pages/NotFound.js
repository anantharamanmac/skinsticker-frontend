import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      {/* <p className="notfound-message">Oops! The page you're looking for doesn't exist.</p> */}
      <p className="notfound-message">Oops! The developer forgot to add this page 😅</p>

      <Link to="/" className="notfound-button">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
