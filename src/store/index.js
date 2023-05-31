import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import users from './users';
import playlists from './playlists';
import prompt from './prompt';

const reducer = combineReducers({
  auth,
  users,
  playlists,
  prompt
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './users';
export * from './playlists';
export * from './prompt';
