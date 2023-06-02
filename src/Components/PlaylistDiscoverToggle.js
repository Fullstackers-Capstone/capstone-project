import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlaylistDiscoverToggle = () => {
  const [selected, setSelected] = useState(true);

  return (
    <div className="toggle-button">
      <button 
        className={`toggle-option ${(selected) ? 'selected' : ''}`} 
        onClick={() => setSelected(!selected)}
      >
        My Playlists
      </button>
      <button 
        className={`toggle-option ${(!selected) ? 'selected' : ''}`} 
        onClick={() => setSelected(!selected)}
      >
        Discover
      </button>
    </div>
  );
}

export default PlaylistDiscoverToggle;
