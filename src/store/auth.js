import axios from 'axios';
import { getCurrentUserProfile } from '../../server/api/spotify';

const auth = (state = { }, action)=> {
  if(action.type === 'SET_AUTH'){
    return action.auth;
  }
  if(action.type === 'SERVER_ERROR'){
    return {...state, error: action.payload};
  }
  return state;
};

export const fetchSpotUser = () => {
  return async(dispatch) => {
    try {
      const user = await getCurrentUserProfile();

      const response = await axios.get(`/api/auth/${user.data.id}/`);

      response.proUser = true;

      createDbUser(response);

      dispatch({ type: 'SET_AUTH', auth: response.data});
    } catch (error) {
      console.error(error);
      dispatch({type: 'SERVER_ERROR', payload: "Error fetching Spotify user! Please try your request again."});
    }
  }
}

export const createDbUser = (response) => {
  return async(dispatch) => {
    try {
      await axios.post('api/users', {
        spotifyId: response.data.id,
        display_name: response.data.display_name,
        email: response.data.email,
        image: response.data.images[0].url
      })
    } catch (error) {
      console.error(error);
      dispatch({type: 'SERVER_ERROR', payload: "Error creating user in the database! Please try your request again."});
    }
  }
}

export const updateAuth = (user)=> {
  return async(dispatch)=> {
    try {
      const response = await axios.put(`/api/users/${user.id}`, user);
      dispatch({ type: 'SET_AUTH', auth: response.data });
    } catch (error) {
      console.error(error);
      dispatch({type: 'SERVER_ERROR', payload: "Error updating auth! Please try your request again."});
    }
  }
}

export const upgradeToPro = (user) => {
  return async (dispatch) => {
    try {
      const request = {spotifyId: user}
      const response = await axios.put('/api/users/upgradeToPro', request);
      dispatch({ type: 'SET_AUTH', auth: response.data });
    } catch (error) {
      console.error(error);
      dispatch({type: 'SERVER_ERROR', payload: "Error upgrading to pro! Please try your request again."});
    }
  };
};

export default auth;
