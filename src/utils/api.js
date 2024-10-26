// src/utils/api.js
/*import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Update with our back-end URL
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`; // Adjust based on our back-end authentication
    }
    return config;
  },
  error => Promise.reject(error),
);

export default api;
*/

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/'; // Replace with our backend's address

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`; // Adjust based on our back-end authentication
    }
    return config;
  },
  error => Promise.reject(error),
);

// Example function to create a new project
export const createProject = async data => {
  try {
    const response = await api.post('/projects/', data);
    return response.data;
  } catch (error) {
    console.error('Failed to create project:', error);
    throw error;
  }
};

export default api;
