import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, getCurrentUserPlaylists, getPlaylistTracks } from '../../server/api/spotify';
import { createUser } from '../store'
import Searcher from './Searcher';
import Prompt from './Prompt';
import { catchErrors } from '../../server/api/utils';
import PlaylistDiscoverToggle from './PlaylistDiscoverToggle';
import MyPlaylists from './MyPlaylists';
import Discover from './Discover';
import CreatePlaylistButton from './CreatePlaylistButton';

const Home = () => {

  const { auth } = useSelector(state => state);
  const [selected, setSelected] = useState(true);

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
