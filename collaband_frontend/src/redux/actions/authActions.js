// src/redux/actions/authActions.js
import api from '../../utils/api';

export const login = (emailOrUsername, password) => async dispatch => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' });
    const response = await api.post('/auth/login/', {
      email_or_username: emailOrUsername,
      password,
    });
    localStorage.setItem('token', response.data.token);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { user: response.data.user },
    });
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAIL',
      payload: error.response?.data || 'Something went wrong',
    });
  }
};

export const register = userData => async dispatch => {
  try {
    dispatch({ type: 'REGISTER_REQUEST' });
    await api.post('/auth/register/', userData);
    dispatch({
      type: 'REGISTER_SUCCESS',
    });
  } catch (error) {
    dispatch({
      type: 'REGISTER_FAIL',
      payload: error.response?.data || 'Something went wrong',
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch({ type: 'LOGOUT' });
};
