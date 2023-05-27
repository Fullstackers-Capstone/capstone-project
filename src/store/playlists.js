import axios from 'axios';

const playlists = (state = [], action) => {
    if(action.type === 'SET_PLAYLISTS'){
        return action.playlists;
    }
    if(action.type === 'CREATE_PLAYLIST'){
        return state = [...state, action.playlist];
    }
    return state;
}

export const fetchPlaylists = () => {
    return async(dispatch) => {
        const response = await axios.get('/api/playlists');
        dispatch({ type: 'SET_PLAYLISTS', playlists: response.data});
    }
}

export const createPlaylist = (playlist) => {
    return async(dispatch) => {
        const response = await axios.post('/api/playlists', playlist);
        dispatch({ type: 'CREATE_PLAYLIST', playlist: response.data});
    }
}

export default playlists;