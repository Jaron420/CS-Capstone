// src/pages/Register.js
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import api from '../utils/api';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      return;
    }
    try {
      await api.post('/auth/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            required
            value={formData.username}
            onChange={e =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            required
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            required
            value={formData.password}
            onChange={e =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <TextField
            label="Confirm Password"
            fullWidth
            margin="normal"
            type="password"
            required
            value={formData.password2}
            onChange={e =>
              setFormData({ ...formData, password2: e.target.value })
            }
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
          </Box>
        </form>
        <Box mt={2}>
          <Typography variant="body2">
            Already have an account?{' '}
            <RouterLink to="/login">Login here</RouterLink>.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
