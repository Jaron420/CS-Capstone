// src/pages/Login.js
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import api from '../utils/api';

function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login/', {
        email_or_username: emailOrUsername,
        password,
      });
      // Save the authentication token
      localStorage.setItem('token', response.data.token);
      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email/username or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email or Username"
            fullWidth
            margin="normal"
            required
            value={emailOrUsername}
            onChange={e => setEmailOrUsername(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </Box>
        </form>
        <Box mt={2}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <RouterLink to="/register">Register here</RouterLink>.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
