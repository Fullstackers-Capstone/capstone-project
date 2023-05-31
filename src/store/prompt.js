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
      const token = window.localStorage.getItem('spotify_access_token');
      const response = await axios.post('/api/prompt', request, {
        headers: {
          authorization: token
        }
    });
        //const response = await axios.post('/api/prompt', request);
      dispatch({ type: 'CREATE_PROMPT', prompt: response.data });
    };
  };

export default prompt;