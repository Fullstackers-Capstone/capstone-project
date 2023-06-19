import axios from 'axios';
const users = (state = [], action) => {
    if(action.type === 'SET_USERS'){
        return action.users;
    }
    if(action.type === 'UPDATE_USER'){
        return state.map(user => {
            if(user.id === action.user.id) {
                return action.user;
            }
            return user;
        })
    }
    if(action.type === 'CREATE_USER'){
        return state = [...state, action.user];
    }
    return state;
}

// export const fetchUsers = () => {
//     return async(dispatch) => {
//         const response = await axios.get('/api/users');
//         dispatch({ type: 'SET_USERS', users: response.data});
//     }
// }


// export const createUser = (user) => {
//     return async(dispatch) => {
//         const response = await axios.post('/api/users', user);
//         dispatch({ type: 'CREATE_USER', user: response.data});
//     }
// }

export const updateUser = (user) => {
  return async (dispatch, getState) => {
    try {
      const existingUser = getState().users.find((u) => u.id === user.id);
      if (existingUser && JSON.stringify(existingUser) !== JSON.stringify(user)) {
        const response = await axios.put(`/api/users/${user.id}`, user);
        dispatch({ type: 'UPDATE_USER', user: response.data });
      }
    } catch (error) {
      console.error(error);
      dispatch({type: 'SERVER_ERROR', payload: "Error updating user! Please try your request again."});
    }
  };
};

export const upgradeToPro = () => {
  return async (dispatch) => {
    try {
      const spotifyId = window.localStorage.getItem('spotifyId');
      const response = await axios.put('/api/prompt',  {
        headers: {
          spotifyId: spotifyId
        }
      });
      dispatch({ type: 'UPDATE_USER', user: response.data });
    } catch (error) {
      console.error(error);
      dispatch({type: 'SERVER_ERROR', payload: "Error upgrading user to Pro! Please try your request again."});
    }
  };
};


export const fetchUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      dispatch(setUser(response.data));
    } catch (error) {
      console.error(error);
      dispatch({type: 'SERVER_ERROR', payload: "Error fetching user! Please try your request again."});
    }
  };
};

export default users;