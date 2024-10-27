// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import api from '../utils/api';

function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/api/collaband/dashboard/');
        setProjects(response.data.projects);
      } catch (err) {
        console.error('Failed to fetch projects', err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Projects
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/projects/new"
      >
        Create New Project
      </Button>
      <List>
        {projects.map(project => (
          <ListItem
            key={project.id}
            button
            component={RouterLink}
            to={`/projects/${project.id}`}
          >
            <ListItemText
              primary={project.projectName}
              secondary={project.description}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Dashboard;
