import React from 'react';
import { Link } from 'react-router-dom';

const CreatePlaylistButton = () => {
  return (
    <div className="playlist-button-container">
      <Link to="/prompt" className="playlist-button">Create Playlist</Link>
    </div>
  );
};

export default CreatePlaylistButton;
