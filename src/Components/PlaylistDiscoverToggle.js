import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlaylistDiscoverToggle = () => {
  const [selected, setSelected] = useState('playlists');
  const navigate = useNavigate();

  const handleClick = (path) => {
    setSelected(path);
    navigate(`/${path}`);
  }

  return (
    <div className="toggle-button">
      <button 
        className={`toggle-option ${selected === 'playlists' ? 'selected' : ''}`} 
        onClick={() => handleClick('playlists')}
      >
        My Playlists
      </button>
      <button 
        className={`toggle-option ${selected === 'discover' ? 'selected' : ''}`} 
        onClick={() => handleClick('discover')}
      >
        Discover
      </button>
    </div>
  );
}

export default PlaylistDiscoverToggle;
