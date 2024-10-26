// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function Profile() {
  const [user, setUser] = useState({ username: '', email: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/user/');
        setUser(response.data);
      } catch (err) {
        console.error('Failed to fetch user data', err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h2>Your Profile</h2>
      <div>
        <label>Username:</label>
        <p>{user.username}</p>
      </div>
      <div>
        <label>Email:</label>
        <p>{user.email}</p>
      </div>
      {/* Optionally include form to update profile information */}
    </div>
  );
}

export default Profile;
