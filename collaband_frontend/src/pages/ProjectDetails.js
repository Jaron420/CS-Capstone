// src/pages/ProjectDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Typography, Container, Button, Box } from '@mui/material';
import api from '../utils/api';

function ProjectDetails() {
  const { projectId } = useParams();
  const [userRole, setUserRole] = useState('');
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/api/collaband/projects/${projectId}/`);
        setProject(response.data.project);
        setUserRole(response.data.userRole); // Assuming the back end provides userRole
      } catch (err) {
        console.error('Failed to fetch project details', err);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleDelete = async () => {
    try {
      await api.delete(`/collaband/projects/${projectId}/`);
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to delete project', err);
    }
  };

  if (!project) {
    return <Typography>Loading project details...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {project.projectName}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {project.description}
      </Typography>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to={`/projects/${projectId}/music-editor`}
          sx={{ mr: 2 }}
        >
          Open Music Editor
        </Button>
        {/* Conditionally render buttons based on userRole */}
        {(userRole === 'owner' || userRole === 'admin') && (
          <Button variant="outlined" color="secondary" onClick={handleDelete}>
            Delete Project
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default ProjectDetails;
