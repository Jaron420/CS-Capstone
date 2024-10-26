// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>
        Go back to the <Link to="/">Home Page</Link>.
      </p>
    </div>
  );
}

export default NotFound;
