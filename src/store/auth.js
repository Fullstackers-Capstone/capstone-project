import axios from 'axios';
import { getCurrentUserProfile } from '../../server/api/spotify';

const auth = (state = { }, action)=> {
  if(action.type === 'SET_AUTH'){
    return action.auth;
  }
  return state;
};

export const fetchSpotUser = () => {
  return async(dispatch) => {
    const user = await getCurrentUserProfile();
      const response = await axios.get(`/api/auth/${user.data.id}/`);
      
      localStorage.setItem("spotifyId",response.data.spotifyId);
      dispatch({ type: 'SET_AUTH', auth: response.data})
      console.log(user);
  }
}

export const updateAuth = (user)=> {
  return async(dispatch)=> {
    const response = await axios.put(`/api/users/${user.id}`, user);
    return { type: 'SET_AUTH', auth: response.data };
  }
}

export default auth;