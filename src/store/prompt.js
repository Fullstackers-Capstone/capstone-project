import axios from 'axios';
const prompt = (state = { }, action)=> {
  if(action.type === 'SET_PROMPT'){
    return action.prompt;
  }
  return state;
};


export const getResponse = (prompt)=> {
  return async(dispatch)=> {
    console.log('fff');
    const token = window.localStorage.getItem('token');
    const response = await axios.post('/api/prompt', prompt, {
      headers: {
        authorization: token
      }
    });
    dispatch({ type: 'SET_PROMPT', prompt: response.data });
  };
};

export default prompt;