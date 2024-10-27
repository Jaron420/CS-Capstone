// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';


function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(state => state.auth.error);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(emailOrUsername, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

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
