// src/redux/reducers/projectReducer.js
const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PROJECTS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_PROJECTS_SUCCESS':
      return { ...state, loading: false, projects: action.payload };
    case 'FETCH_PROJECTS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    // Add other case statements as needed
    default:
      return state;
  }
}
