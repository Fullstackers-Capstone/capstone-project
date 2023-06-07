import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlaylistType = () => {
  const navigate = useNavigate(); // add this line

  return (
    <div id='content-body'>
      <div id='pl-container'>
        <div className="playlist-options">
          <h2 className="options-title">Choose Playlist Type</h2>
          <div className="option" onClick={() => navigate('/prompt')}> {/* add onClick handler here */}
            <h3>AI Prompt</h3>
            <span className='pl-type-desc'>Describe what you want a playlist for and an AI will make the perfect mix.</span>
          </div>
          <div className="option" >
            <h3>Friends of Artists</h3>
            <span className='pl-type-desc'>Describe what you want a playlist for and an AI will make the perfect mix.</span>
          </div>
          <div className="option">
            <h3>Rewind</h3>
            <span className='pl-type-desc'>Create personalized playlists based on your listening history.</span>
          </div>
          <div className="option">
            <h3>Genres</h3>
            <span className='pl-type-desc'>Blend up to five genres to create a playlist.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistType;
