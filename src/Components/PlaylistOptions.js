import React from 'react';

function PlaylistOptions() {
  return (
    <div className="playlist-options">
      <h2 className="options-title">Choose Playlist Type</h2>
      <div className="option">
        <h3>AI Prompt</h3>
        <p>Describe what you want a playlist for and an AI will make the perfect mix.</p>
      </div>
      <div className="option">
        <h3>Genres</h3>
        <p>Blend up to five genres to create a playlist.</p>
      </div>
      <div className="option">
        <h3>Rewind</h3>
        <p>Create personalized playlists based on your listening history.</p>
      </div>
    </div>
  );
}

export default PlaylistOptions;
