import axios from 'axios';

const users = (state = [], action) => {
    if(action.type === 'SET_USERS'){
        return action.users;
    }
    if(action.type === 'CREATE_USER'){
        return state = [...state, action.user];
    }
    return state;
}

export const createUser = (user) => {
    return async(dispatch) => {
        console.log(window.location);
        const response = await axios.post('/api/users', user);
        dispatch({ type: 'CREATE_USER', user: response.data});
    }
}

export default users;