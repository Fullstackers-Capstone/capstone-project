import axios from 'axios';

const serverError = (state = { }, action)=> {
  if(action.type === 'SERVER_ERROR'){
   
    return {hasError: true, message: action.payload};
  }
  if(action.type === 'FIXED_SERVER_ERROR'){
    return {hasError: false};
  }
  return state;
};

export default serverError