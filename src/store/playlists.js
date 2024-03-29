import axios from 'axios';
import { createPlaylist } from '../../server/api/spotify';

const playlists = (state = [], action) => {
  if (action.type === 'SET_PLAYLISTS') {
    return action.playlists
  }
  if (action.type === 'CREATE_PLAYLIST') {
    return [action.playlist, ...state];
  }
  if(action.type === 'UPDATE_PLAYLIST'){
    state = state.map(playlist => {
      if(playlist.id === action.playlist.id){
        return action.playlist;
      }
      return playlist;
    })
  }
  if(action.type === 'DESTROY_PLAYLIST'){
    return state.filter(_playlist => _playlist.id !== action.playlist.id)
  }
  return state;
};

export const fetchPlaylists = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/playlists')
      dispatch({ type: 'SET_PLAYLISTS', playlists: response.data });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'SERVER_ERROR', payload: "Error fetching playlists!" })
    }
  };
};

export const createDBPlaylist = (auth, prompt, input, navigate) => {
  return async (dispatch) => {
    try {

      const name = JSON.parse(prompt.name)

      const newUserId = window.localStorage.getItem('newUserId')
      const userSpotId = window.localStorage.getItem('spotifyId')

      const userInput = prompt.userInput;

      const playlist = await createPlaylist({ userId: auth.spotifyId, name: name.playlistName, description: input }, prompt, auth.discoverPlaylist)

      const request = { isDiscoverable: auth.discoverPlaylists, prompt: userInput, userSpotId: userSpotId, spotId: playlist.id, name: playlist.name, userId: newUserId }

      const response = await axios.post('/api/playlists', request)

      navigate(`/playlists/${ response.data.id }`)

      dispatch({ type: 'CREATE_PLAYLIST', playlist: response.data });

    } catch (error) {
      console.error(error);
      dispatch({ type: 'SERVER_ERROR', payload: "Error creating playlist in the database! Please try your request again." })
    }
  };
};

export const createPlaylistTest = (playlist) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/playlists', playlist);
      dispatch({ type: 'CREATE_PLAYLIST', playlist: response.data });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'SERVER_ERROR', payload: "Error creating playlist! Please try your request again." });
    }
  };
};

export const updatePlaylist = (playlist) => {
  return async(dispatch) => {
    try {
      const response = await axios.put(`/api/playlists/${ playlist.id }`, playlist);
      dispatch({ type: 'UPDATE_PLAYLIST', playlist: response.data });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'SERVER_ERROR', payload: "Error updating playlist! Please try your request again." });
    }
  };
};

export const destroyPlaylist = (playlist) => {
  return async(dispatch) => {
    await axios.delete(`/api/playlists/${ playlist.id }`);
    dispatch({ type: 'DESTROY_PLAYLIST', playlist })
  }
}


export default playlists;

