// CreateProject.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Container, TextField, Button, Typography } from '@mui/material';

function CreateProject() {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateProject = async () => {
    try {
      const response = await api.post('/api/collaband/dashboard/', {
        projectName,
        description,
      });
      navigate(`/projects/${response.data.id}`);
    } catch (err) {
      console.error('Failed to create project', err);
      setError('Failed to create project. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create New Project
      </Typography>
      <TextField
        label="Project Name"
        fullWidth
        margin="normal"
        required
        value={projectName}
        onChange={e => setProjectName(e.target.value)}
      />
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateProject}
        disabled={!projectName}
      >
        Create Project
      </Button>
    </Container>
  );
}

export default CreateProject;
