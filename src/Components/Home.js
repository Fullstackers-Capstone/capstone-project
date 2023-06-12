import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MyPlaylists from './MyPlaylists';
import Discover from './Discover';
import CreatePlaylistButton from './CreatePlaylistButton';

const Home = () => {

  const { auth } = useSelector(state => state);
  const [selected, setSelected] = useState(true);

  localStorage.setItem("newUserId",auth.id);
  localStorage.setItem("authDiscoverable", auth.discoverPlaylists);

  if(!auth){
    return null;
  }

  return(

    <div id='content-body'>
      <div id='pl-discover-toggle-container'>
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
      </div>
      {(selected) ? <MyPlaylists/> : <Discover/>}
      <CreatePlaylistButton />
    </div>
  )
};

export default Home;