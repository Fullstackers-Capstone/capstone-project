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
      const token = window.localStorage.getItem('token');
      const response = await axios.put('/api/prompt', prompt, {
        headers: {
          authorization: token
        }
      });
      dispatch({ type: 'CREATE_PROMPT', prompt: response.data });
    };
  };

export default prompt;