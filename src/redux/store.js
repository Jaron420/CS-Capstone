// src/redux/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './reducers/authReducer';
import projectReducer from './reducers/projectReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectReducer,
  // Add other reducers here
});

const middleware = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
