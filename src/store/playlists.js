import axios from 'axios';
import { createPlaylist, getPlaylistById } from '../../server/api/spotify';

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
      const response = await axios.get('/api/playlists');

      // console.log('response: ', response);

      const spotIdData = await Promise.all(response.data.map(async (response) => ({
        spotData: await getPlaylistById(Object.entries(response)[3][1]),
        prompt: Object.entries(response)[1][1],
        createdAt: Object.entries(response)[5][1]
      })
      ));

      // const timeData = response.data.map(response => Object.entries(response)[5][1]);

      // const promptData = response.data.map(response => Object.entries(response)[1][1]);

      // console.log('timeData: ', timeData);

      // console.log('promptData: ', promptData);

      // const spotReturn = await Promise.all(spotIdData.map(async(spotId) => await getPlaylistById(spotId)
      // ));

      dispatch({ type: 'SET_PLAYLISTS', playlists: spotIdData });
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


