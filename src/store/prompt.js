import axios from 'axios';
import { searchFunctionality, createPlaylist } from '../../server/api/spotify';
import { fetchPlaylists } from './playlists';
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
    const request = { prompt: prompt };
    const spotifyId = window.localStorage.getItem('spotifyId');
    const response = await axios.post('/api/prompt', request, {
      headers: {
        spotifyId: spotifyId
      }
    });
    dispatch(createPrompt(response.data));
  };
};

//we are getting the prompt length and the data (in this case the songs we're passing in)
export const getJSONResponse = (prompt, length, data) => {
  return async (dispatch) => {
    const request = {prompt: prompt,length: length, spotifyData: data};
    const spotifyId = window.localStorage.getItem('spotifyId');
    const response = await axios.post('/api/prompt/json', request, {
      headers: {
        spotifyId: spotifyId
      }
    });
    console.log("response we get from that prompt create", response.data);
    //the uri list is null though so we need to pass this into the getSpotifyURIs 
    dispatch(getSpotifyURIs(response.data));
  };
};

const getSpotifyURIs = (response) => {
  return async (dispatch) => {
    const jsonResponse = JSON.parse(response.response);
    //this is making it so we can access items in the json object
    const spotifyId = window.localStorage.getItem('spotifyId');
    const URIResponse = await Promise.all(jsonResponse.map(async(element) => {
      const uri = await searchFunctionality(element)
      if (await uri){
        return await uri;
        
      }
    }));
   //the above is fetching the uris for each track
    const filteredResponse = URIResponse.filter(uri => uri !== undefined)

    await createPlaylist({userId: spotifyId, name: 'Anything We Want', description: 'Same with the description.'}, filteredResponse)

    console.log("final URI response prompt store", filteredResponse);

    // Make sure URIResponse is an array of strings before storing it
    response.uriList = filteredResponse;
    dispatch(savePrompt(response));
  }
}


export const savePrompt = (prompt) => {
  return async (dispatch) => {
    const request = { prompt: prompt };
    const spotifyId = window.localStorage.getItem('spotifyId');
    const response = await axios.put('/api/prompt', request, {
      headers: {
        spotifyId: spotifyId
      }
    });
    dispatch(createPrompt(response.data));
  };
};


export const getAllPrompts = () => {
  return async (dispatch) => {
    const spotifyId = window.localStorage.getItem('spotifyId');
    const response = await axios.get('/api/prompt', {
      headers: {
        spotifyId: spotifyId
      }
    });
    dispatch(setPrompt(response.data));
  };
};

export default promptReducer;