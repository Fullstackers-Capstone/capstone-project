
import axios from 'axios';
import { searchFunctionality, createPlaylist } from '../../server/api/spotify';
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
       }
       else{
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
      dispatch({type: SERVER_ERROR, payload: "Error getting response!"});
    }
  };
};

export const getJSONResponse = (prompt, length, data) => {
  return async (dispatch) => {
    try {
      const request = {prompt: prompt,length: length, spotifyData: data};
      const spotifyId = window.localStorage.getItem('spotifyId');
      const response = await axios.post('/api/prompt/json', request, {
        headers: {
          spotifyId: spotifyId
        }
      });
      dispatch(savePrompt(response.data));
    } catch (error) {
      console.error(error);
      dispatch({type: 'SERVER_ERROR', payload: "Error getting JSON response!"});
    }
  };
};

export const getSpotifyURIs = (prompt, playlist) => {
  return async (dispatch) => {
    try {
      const URIResponse = await Promise.all(playlist.map(async(element) => {
        const uri = await searchFunctionality(element)
        if (await uri){
          return await uri;
        }
      }));
      // Log the final URIResponse
      const filteredResponse = URIResponse.filter(uri => uri !== undefined)
      //await createPlaylist({userId: spotifyId, name: 'Anything We Want', description: 'Same with the description.'}, filteredResponse)
      prompt.uriList = filteredResponse;
      dispatch(update(prompt));
    } catch (error) {
      console.error(error);
      dispatch({type: 'SERVER_ERROR', payload: "Error getting Spotify URIs!"});
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
      dispatch({type: SERVER_ERROR, payload: "Error saving prompt!"});
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
      dispatch({type: SERVER_ERROR, payload: "Error updating prompt!"});
    }
  };
};

console.log("hello")

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
      dispatch({type: SERVER_ERROR, payload: "Error fetching all prompts!"});
    }
  };
};

export default promptReducer;
