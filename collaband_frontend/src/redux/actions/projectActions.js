// src/redux/actions/projectActions.js
import api from '../../utils/api';

export const fetchProjects = () => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/api/collaband/dashboard/', {
      headers: {
        Authorization: `Token ${token}`, // Make sure this header is set correctly
      },
    });
    dispatch({
      type: 'FETCH_PROJECTS_SUCCESS',
      payload: response.data.projects,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_PROJECTS_FAIL',
      payload: error.response?.data || 'Something went wrong',
    });
  }
};
