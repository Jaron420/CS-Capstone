// src/pages/Home.js
import React from 'react';
import { Typography, Container, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Home() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Container>
      <Box textAlign="center" mt={5}>
        <Typography variant="h2" gutterBottom>
          Welcome to CollaBand
        </Typography>
        <Typography variant="h5" gutterBottom>
          The Ultimate Music Collaboration Hub
        </Typography>
        {!isAuthenticated && (
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/register"
              sx={{ mr: 2 }}
            >
              Create an Account
            </Button>
            <Button
              variant="outlined"
              color="primary"
              component={RouterLink}
              to="/login"
            >
              Log In
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Home;
