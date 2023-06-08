import axios from 'axios';
import { searchFunctionality } from '../../server/api/spotify';
const SET_PROMPT = 'SET_PROMPT';
const CREATE_PROMPT = 'CREATE_PROMPT';
const DESTROY_PROMPT = 'DESTROY_PROMPT';

const initialState = [];

const promptReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROMPT:
      return action.prompt;
    case CREATE_PROMPT:
      return [...state, action.prompt];
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

export const getJSONResponse = (prompt, length, data) => {
  return async (dispatch) => {
    const request = {prompt: prompt,length: length, spotifyData: data};
    const spotifyId = window.localStorage.getItem('spotifyId');
    const response = await axios.post('/api/prompt/json', request, {
      headers: {
        spotifyId: spotifyId
      }
    });
    dispatch(getSpotifyURIs(response.data));
  };
};

const getSpotifyURIs = (response) => {
  return async (dispatch) => {
    const jsonResponse = JSON.parse(response.response);

    const URIResponse = await Promise.all(jsonResponse.map(async(element) => {
      // Log the element before it's passed into searchFunctionality
      console.log("yooooooooo",element);
   
      const uri = await searchFunctionality(element)
      if (await uri){
        return await uri;
      }
    
    }));

    // Log the final URIResponse

    const filteredResponse = URIResponse.filter(uri => uri !== undefined)

    console.log("final URI response", filteredResponse);

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

/* PRE MT 6/4 UPDATES

import axios from 'axios';

const prompt = (state = [], action) => {
    if(action.type === 'SET_PROMPT'){
        return action.prompt;
    }
    if(action.type === 'CREATE_PROMPT'){
        return state = [...state, action.prompt];
    }
    return state;
}

export const getResponse = (prompt)=> {
    return async(dispatch)=> {
      const request = {prompt: prompt};
      const spotifyId = window.localStorage.getItem('spotifyId');
      const response = await axios.post('/api/prompt', request, {
        headers: {
          spotifyId: spotifyId
        }
    });
        //const response = await axios.post('/api/prompt', request);
      dispatch({ type: 'CREATE_PROMPT', prompt: response.data });
    };
  };

  export const getJSONResponse = (length, data)=> {
    return async(dispatch)=> {
      const request = {length: length, spotifyData: data};
      const spotifyId = window.localStorage.getItem('spotifyId');
      const response = await axios.post('/api/prompt/json', request, {
        headers: {
          spotifyId: spotifyId
        }
    });
        //const response = await axios.post('/api/prompt', request);
      dispatch({ type: 'CREATE_PROMPT', prompt: response.data });
    };
  };

  export const getAllPrompts = (prompt)=> {
    return async(dispatch)=> {
      const spotifyId = window.localStorage.getItem('spotifyId');
      const response = await axios.get('/api/prompt',  {
        headers: {
          spotifyId: spotifyId
        }
    });
        //const response = await axios.post('/api/prompt', request);
      dispatch({ type: 'SET_PROMPT', prompt: response.data });
    };
  };

export default prompt;




*/