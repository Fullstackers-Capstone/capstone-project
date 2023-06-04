const axios = require('axios');

const createPlaylist = async (userId, name, description) => {
  try {
    const response = await axios.post(`/users/${userId}/playlists`, {
      name,
      description,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addTracksToPlaylist = async (playlistId, trackUris) => {
  try {
    const response = await axios.post(`/playlists/${playlistId}/tracks`, {
      uris: trackUris,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createPlaylist,
  addTracksToPlaylist,
};
