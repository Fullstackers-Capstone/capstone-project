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