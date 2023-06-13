import axios from "axios";
import { useDispatch } from "react-redux";

// Map for localStorage keys. Helps us refer to keys for key/value pair of localstorage
const LOCALSTORAGE_KEYS = {
  accessToken: 'spotify_access_token',
  refreshToken: 'spotify_refresh_token',
  expireTime: 'spotify_token_expire_time',
  timestamp: 'spotify_token_timestamp',
};

// Map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

// Clear out all localStorage items we've set and reload the page
export const logout = () => {
  // Clear all localStorage items
  for (const property in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
  }
  // Navigate to login page
  window.location = window.location.origin;
};

// Use the refresh token in localStorage to hit the /refresh_token endpoint in our Node app, then update values in localStorage with data from response.
const refreshToken = async () => {
  try {
    // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
    if (
      !LOCALSTORAGE_VALUES.refreshToken ||
      LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
      Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000
    ) {
      console.error('No refresh token available');
      logout();
    }

    // Use `/refresh_token` endpoint from our Node app
    const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);

    // Update localStorage values
    window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

    // Reload the page for localStorage updates to be reflected
    window.location.reload();
  } catch (e) {
    console.error(e);
  }
};

// Checks if the amount of time that has elapsed between the timestamp in localStorage
const hasTokenExpired = () => {
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
  if (!accessToken || !timestamp) {
    return false;
  }
  // and now is greater than the expiration time of 3600 seconds (1 hour).
  const millisecondsElapsed = Date.now() - Number(timestamp);
  // returns boolean Whether or not the access token in localStorage has expired
  return millisecondsElapsed / 1000 > Number(expireTime);
};

//created the function below in order to grab the access token to use for our App.js file
//update this to store tokens in local storage first time user logs in and pulls it next time they're available
const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
  };
  const hasError = urlParams.get('error');

  // if there's an error OR the token in localStorage has expired, refresh the token
  if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
    refreshToken();
  }

  // if there is a valid access token in localStorage, use that
  if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
    return LOCALSTORAGE_VALUES.accessToken;
  }

  // If there is a token in the URL query params, the user is logging in for the first time
  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    // Store the query params in localStorage
    for (const property in queryParams) {
      window.localStorage.setItem(property, queryParams[property]);
    }
    // Set timestamp
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    // Return access token from query params
    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }

  // We shouldn't get here really
  return false;
};

export const accessToken = getAccessToken();

export const spotifyAxios = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
});

// Get the current user's profile
export const getCurrentUserProfile = () => spotifyAxios.get('/me');

// Get the current user's playlists
export const getCurrentUserPlaylists = (limit = 20) => {
  return spotifyAxios.get(`/me/playlists?limit=${limit}`);
};

// Get the user's top artists
export const getTopArtists = (time_range = 'short_term') => {
  return spotifyAxios.get(`/me/top/artists?time_range=${time_range}`);
};


export const getTopTracks = (time_range = 'short_term') => {
  return spotifyAxios.get(`/me/top/tracks?time_range=${time_range}`);
};


// Search for tracks
// We will need to loop through each track to add more than one
export const searchFunctionality = async (searchKey) => {
  const track_uris = [];
  try {
    const response = await spotifyAxios.get('/search', {
      params: {
        q: `name:${encodeURIComponent(searchKey.title)}album:${encodeURIComponent(searchKey.album)}artist:${encodeURIComponent(searchKey.artist)}`,
        type: 'track',
      },
    });
    // https://api.spotify.com/v1/search?q=name:${encodeURIComponent(song.title)}album:${encodeURIComponent(song.album)}artist:${encodeURIComponent(song.artist)}&type=track`,
    //response is all the songs from spotify
    console.log('searchFunctionality Response',response);
    if (await response.data.tracks.items[0]){
      return await response.data.tracks.items[0].uri
    }
    else{
      console.log(response.data, searchKey);
    }

  } catch (error) {
    console.error(error);
    throw error;
  }
};




// Get artist information
export const getArtistInfo = async (artistID) => {
  try {
    const response = await spotifyAxios.get(`/artists/${artistID}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get a playlist by its ID
export const getPlaylistById = (playlist_id) => {
  return spotifyAxios.get(`/playlists/${playlist_id}/`);
};

// Get tracks in a playlist
export const getPlaylistTracks = (playlist_id) => {
  return spotifyAxios.get(`/playlists/${playlist_id}/tracks?limit=7`);
};

// Get audio features for tracks
export const getAudioFeaturesForTracks = (ids) => {
  return spotifyAxios.get(`/audio-features?ids=${ids}`);
};


  export const createPlaylist = async ({userId, name, description}, prompt, discoverPlaylists) => {
  try {

    const playlist = await spotifyAxios.post(`/users/${userId}/playlists`, {
      name,
      description
    });
 
    addTracksToPlaylist(playlist.data.id, prompt.uriList, description, discoverPlaylists)


    return playlist.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addTracksToPlaylist = async (playlistId, track_uris, description, discoverPlaylists) => {
  try {
    const response = await spotifyAxios.post(`/playlists/${playlistId}/tracks`, {
      uris: track_uris,
    });

    const newUserId = window.localStorage.getItem('newUserId');

    // await axios.post('/api/playlists', {
    //   spotId: playlistId,
    //   prompt: description,
    //   userId: newUserId,
    //   isDiscoverable: discoverPlaylists
    // });

    return response.data;

  } catch (error) {
    console.error(error);
    throw error;
  }
};