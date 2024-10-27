// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateProject from './pages/CreateProject';
import MusicEditor from './pages/MusicEditor';
import Profile from './pages/Profile';
import ProjectDetails from './pages/ProjectDetails';
import NotFound from './pages/NotFound';

// Custom Components
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/new"
          element={
            <ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId/music-editor"
          element={
            <ProtectedRoute>
              <MusicEditor />
            </ProtectedRoute>
          }
        />
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
