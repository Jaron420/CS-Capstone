// src/pages/CreateProject.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

function CreateProject() {
  const navigate = useNavigate(); // Move inside the component

  const handleCreateProject = async () => {
    try {
      const response = await api.post('/collaband/dashboard/', {
        projectName: 'My New Project',
        description: 'Project description',
      });
      navigate(`/projects/${response.data.id}`);
    } catch (err) {
      console.error('Failed to create project', err);
    }
  };

  return (
    <div>
      <h1>Create Project</h1>
      <button onClick={handleCreateProject}>Create Project</button>
    </div>
  );
}

export default CreateProject;
