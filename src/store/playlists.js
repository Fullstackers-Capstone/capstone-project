import axios from 'axios';
import { getPlaylistById } from '../../server/api/spotify';
import { createPlaylist } from '../../server/api/spotify';

const playlists = (state = [], action) => {
  if (action.type === 'SET_PLAYLISTS') {
    return action.playlists
    // state = action.playlists;
    // state.sort((a, b) => {
    //   if(a.createdAt > b.createdAt){
    //     return -1;
    //   }
    //   return 1
    // })
  }
  if (action.type === 'CREATE_PLAYLIST') {
    return [...state, action.playlist];
  }
  if(action.type === 'UPDATE_PLAYLIST'){
    state = state.map(playlist => {
        if(playlist.id === action.playlist.id){
            return action.playlist;
        }
        return playlist;
    })
}
  return state;
};

export const fetchPlaylists = () => {
  return async (dispatch) => {
    try {

      const response = await axios.get('/api/playlists')
      
      // .then(async (response) => await Promise.all(response.data.map(async (response) => ({
      //   spotData: await getPlaylistById(Object.entries(response)[3][1]),
      //   prompt: Object.entries(response)[1][1],
      //   createdAt: Object.entries(response)[5][1],
      //   isDiscoverable: Object.entries(response)[2][1],
      //   userId: Object.entries(response)[6][1],
      //   id: Object.entries(response)[0][1]
      // }))))

      dispatch({ type: 'SET_PLAYLISTS', playlists: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const createDBPlaylist = (auth, prompt, input) => {
  return async (dispatch) => {
      const name = JSON.parse(prompt.name)

      const newUserId = window.localStorage.getItem('newUserId')

      const userInput = prompt.userInput;

      const playlist = await createPlaylist({userId: auth.spotifyId, name: name.playlistName, description: input}, prompt, auth.discoverPlaylist)

      const request = {isDiscoverable: auth.discoverPlaylists, prompt: userInput, spotId: playlist.id, userId: newUserId}

      const response = await axios.post('/api/playlists', request)

      dispatch({ type: 'CREATE_PLAYLIST', playlist: response.data });
  };
};

export const createPlaylistTest = (playlist) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/playlists', playlist);
      dispatch({ type: 'CREATE_PLAYLIST', playlist: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const updatePlaylist = (playlist) => {

  return async(dispatch) => {
      const response = await axios.put(`/api/playlists/${playlist.id}`, playlist)
      dispatch({ type: 'UPDATE_PLAYLIST', playlist: response.data})
  }
}

export default playlists;


/* import axios from 'axios';
import { createPlaylist, getPlaylistById } from '../../server/api/spotify';

const playlists = (state = [], action) => {
  if (action.type === 'SET_PLAYLISTS') {
    return action.playlists;
  }
  if (action.type === 'CREATE_PLAYLIST') {
    return [...state, action.playlist];
  }
  if(action.type === 'UPDATE_PLAYLIST'){
    state = state.map(playlist => {
        if(playlist.id === action.playlist.id){
            return action.playlist;
        }
        return playlist;
    })
}
  return state;
};

export const fetchPlaylists = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/playlists');

      console.log('response: ', response);

      const spotIdData = await Promise.all(response.data.map(async (response) => ({
        spotData: await getPlaylistById(Object.entries(response)[3][1]),
        prompt: Object.entries(response)[1][1],
        createdAt: Object.entries(response)[5][1],
        userId: Object.entries(response)[6][1],
        isDiscoverable: Object.entries(response)[2][1]
      })
      ));

      console.log('spotIdData', spotIdData);

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

export const updatePlaylist = (playlist) => {
  return async(dispatch) => {
    const response = await axios.put(`/api/playlists/${playlist.id}`, playlist)
    dispatch({ type: 'UPDATE_PLAYLIST', playlist: response.data});
  }
}


export default playlists;

*/