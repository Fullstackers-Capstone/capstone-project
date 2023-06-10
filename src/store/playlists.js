import axios from 'axios';
import { createPlaylist } from '../../server/api/spotify';

const playlists = (state = [], action) => {
  if (action.type === 'SET_PLAYLISTS') {
    return action.playlists;
  }
  if (action.type === 'CREATE_PLAYLIST') {
    return [...state, action.playlist];
  }
  return state;
};

export const fetchPlaylists = () => {
  return async (dispatch) => {
    try {

      console.log('is this being called?');
      const response = await axios.get('/api/playlists');
      dispatch({ type: 'SET_PLAYLISTS', playlists: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const createDBPlaylist = (playlist) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/playlists', playlist);
      dispatch({ type: 'CREATE_PLAYLIST', playlist: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};


export default playlists;


/* 6/4 MT Updates

import axios from 'axios';

const playlists = (state = [], action) => {
    if(action.type === 'SET_PLAYLISTS'){
        return action.playlists;
    }
    if(action.type === 'CREATE_PLAYLIST'){
        return state = [...state, action.playlist];
    }
    return state;
}

export const fetchPlaylists = () => {
    return async(dispatch) => {
        const response = await axios.get('/api/playlists');
        dispatch({ type: 'SET_PLAYLISTS', playlists: response.data});
    }
}

export const createPlaylist = (playlist) => {
    return async(dispatch) => {
        const response = await axios.post('/api/playlists', playlist);
        dispatch({ type: 'CREATE_PLAYLIST', playlist: response.data});
    }
}

export default playlists;

*/


