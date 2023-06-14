import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import prompt from './prompt';
import playlists from './playlists';
import serverError from './error';

const reducer = combineReducers({
  auth,
  playlists,
  prompt,
  serverError,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './playlists';
export * from './prompt';
export * from './error';
