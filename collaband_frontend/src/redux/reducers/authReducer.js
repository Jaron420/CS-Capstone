// src/redux/reducers/authReducer.js
const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user')) : null,
  error: null,
  loading: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
        loading: false,
      };
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
        loading: false,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}

