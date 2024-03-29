
import axios from 'axios';
import { searchFunctionality } from '../../server/api/spotify';
const SET_PROMPT = 'SET_PROMPT';
const CREATE_PROMPT = 'CREATE_PROMPT';
const UPDATE_PROMPT = 'UPDATE_PROMPT';
const DESTROY_PROMPT = 'DESTROY_PROMPT';

const initialState = [];

const promptReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROMPT:
      return action.prompt;
    case CREATE_PROMPT:
      return [...state, action.prompt];
    case UPDATE_PROMPT:
      const prompt= state.map(_prompt => {
        if ( _prompt.id === action.prompt.id){
          return action.prompt;
        } else {
          return _prompt;
        }
      });
      return prompt;
    default:
      return state;
  }
};

export const setPrompt = (prompt) => ({
  type: SET_PROMPT,
  prompt
});

export const createPrompt = (prompt) => ({
  type: CREATE_PROMPT,
  prompt
});

export const updatePrompt = (prompt) => ({
  type: UPDATE_PROMPT,
  prompt
})

export const getResponse = (prompt) => {
  return async (dispatch) => {
    try {
      const request = { prompt: prompt };
      const spotifyId = window.localStorage.getItem('spotifyId');
      const response = await axios.post('/api/prompt', request, {
        headers: {
          spotifyId: spotifyId
        }
      });
      dispatch(setPrompt(response.data));
    } catch (error) {
      console.error(error);
      dispatch({ type: SERVER_ERROR, payload: "Error getting response! Please try your request again." });
    }
  };
};

export const getJSONResponse = (prompt, length, data) => {
  return async (dispatch) => {
    try {
      const request = { prompt: prompt,length: length, spotifyData: data };
      const spotifyId = window.localStorage.getItem('spotifyId');
      const response = await axios.post('/api/prompt/json', request, {
        headers: {
          spotifyId: spotifyId
        }
      });
      dispatch(getSpotifyURIs(response.data));
    } catch (error) {
      console.error(error);
      dispatch({ type: 'SERVER_ERROR', payload: "Error getting JSON response! Please try your request again." });
    }
  };
};

export const getSpotifyURIs = (prompt) => {
  return async (dispatch) => {
    try {
      let playlist;
      try {
        // Check if prompt.response is valid JSON
        playlist = JSON.parse(prompt.response);
      } catch (error) {
        // If it's not valid JSON, dispatch a server error
        dispatch({type: 'SERVER_ERROR', payload: "JSON is not valid! Please try a new prompt."});
        return;  // terminate execution of the function here
      }
      
      const newPlaylist = [];
      const uniqueArray = [];
      const URIResponse = await Promise.all(playlist.map(async(element) => {
        const uri = await searchFunctionality(element)
        if (await uri){
          if (uri !== undefined){
            newPlaylist.push({title: uri.name, artist: uri.artists[0].name, album: uri.album.name, uri: uri.uri});
            return await uri.uri;
          }
        }
      }));

      function areObjectsEqual(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
      }

      for (let i = 0; i < newPlaylist.length; i++){
        let isDuplicate = false;

        for (let j = 0; j < uniqueArray.length; j++){
          if (areObjectsEqual(newPlaylist[i], uniqueArray[j])){
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          uniqueArray.push(newPlaylist[i]);
        }
      }

      prompt.uriList = URIResponse;
      prompt.response = uniqueArray;
      dispatch(savePrompt(prompt));
    } catch (error) {
      console.error(error);
      dispatch({ type: 'SERVER_ERROR', payload: "Error getting Spotify URIs! Please try your request again." });
    }
  }
}

export const setSpotifyURIs = (prompt, playlist) => {
  return async (dispatch) => {
    try {
      const uriList = playlist.map(track => track.uri);
      prompt.uriList = uriList;
      dispatch(updatePrompt(prompt));
    } catch (error) {
      console.error(error);
      dispatch({ type: 'SERVER_ERROR', payload: "Error getting Spotify URIs! Please try your request again." });
    }
  }
}

export const savePrompt = (prompt) => {
  return async (dispatch) => {
    try {
      const request = { prompt: prompt };
      const spotifyId = window.localStorage.getItem('spotifyId');
      const response = await axios.put('/api/prompt', request, {
        headers: {
          spotifyId: spotifyId
        }
      });
      dispatch(createPrompt(response.data));
    } catch (error) {
      console.error(error);
      dispatch({ type: SERVER_ERROR, payload: "Error saving prompt! Please try your request again." });
    }
  };
};

export const update = (prompt) => {
  return async (dispatch) => {
    try {
      const request = { prompt: prompt };
      const response = await axios.put('/api/prompt', request);
      dispatch(updatePrompt(response.data));
    } catch (error) {
      console.error(error);
      dispatch({ type: SERVER_ERROR, payload: "Error updating prompt! Please try your request again." });
    }
  };
};

export const getAllPrompts = () => {
  return async (dispatch) => {
    try {
      const spotifyId = window.localStorage.getItem('spotifyId');
      const response = await axios.get('/api/prompt', {
        headers: {
          spotifyId: spotifyId
        }
      });
      dispatch(setPrompt(response.data));
    } catch (error) {
      console.error(error);
      dispatch({ type: SERVER_ERROR, payload: "Error fetching all prompts! Please try your request again." });
    }
  };
};

export default promptReducer;