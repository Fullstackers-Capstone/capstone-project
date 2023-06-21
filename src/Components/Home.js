import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MyPlaylists from './MyPlaylists';
import Discover from './Discover';
import { Link } from 'react-router-dom';
import CreatePlaylistButton from './CreatePlaylistButton';

const Home = () => {

  const { auth, playlists } = useSelector(state => state);
  const [selected, setSelected] = useState(true);

  localStorage.setItem("newUserId",auth.id);
  localStorage.setItem("authDiscoverable", auth.discoverPlaylists);

  const authPlaylists = playlists.map(pl => pl)
  .filter(pl => pl.userId === auth.id)

  if(!auth){
    return null;
  }

  return(

    <div id='content-body'>
      <div id='pl-discover-toggle-container'>
        <div className={`toggle-button ${(selected) ? 'MP' : 'DISC'}`}>
          <button style={{borderRight: 0}}
            className={`toggle-option ${(selected) ? 'selected' : ''}`} 
            onClick={() => setSelected(!selected)}
          >
            My Playlists
          </button>
          <button style={{borderLeft: 0}}
            className={`toggle-option ${(!selected) ? 'disc-selected' : ''}`} 
            onClick={() => setSelected(!selected)}
          >
            Discover
          </button>
        </div>
      </div>
      {(selected) ? <MyPlaylists/> : <Discover/>}
      {authPlaylists.length > 4 && (!auth.proUser) ? "" :     
      <div className="playlist-button-container">
        <Link to="/prompt" className={`playlist-button ${(selected) ? '' : 'DISC'}`}>Create New Playlist</Link>
      </div>}
    </div>
  )
};

export default Home;