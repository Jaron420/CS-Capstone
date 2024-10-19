// src/pages/ProjectDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${projectId}/`);
        setProject(response.data);
      } catch (err) {
        console.error('Failed to fetch project details', err);
      }
    };
    fetchProject();
  }, [projectId]);

  if (!project) {
    return <p>Loading project details...</p>;
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/projects/${projectId}/`);
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to delete project', err);
    }
  };

  return (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <h3>Collaborators:</h3>
      <ul>
        {project.collaborators.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
      <Link to={`/projects/${projectId}/music-editor`}>Open Music Editor</Link>
      {' | '}
      <Link to={`/projects/${projectId}/edit`}>Edit Project</Link>
      {' | '}
      <button onClick={handleDelete}>Delete Project</button>
    </div>
  );
}

export default ProjectDetails;