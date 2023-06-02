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

const Home = () => {

  const { auth } = useSelector(state => state);
  const [playlists, setPlaylists] = useState([]);
  const [selected, setSelected] = useState(true);

  useEffect(() => {
    const getLists = async() => {

    const lists = await getCurrentUserPlaylists(5);
    console.log(lists);

    const listsData = await Promise.all(
      lists.data.items.map(async (_playlist) => {
        const tracks = await getPlaylistTracks(_playlist.id)
        return {
          id: _playlist.id,
          name: _playlist.name,
          image: _playlist.images[0].url,
          href: _playlist.external_urls.spotify,
          tracks: tracks
        };
      })
    );
  
      setPlaylists(listsData);
    }
    catchErrors(getLists());
  }, []);

  const dispatch = useDispatch();

  if(!auth){
    return null;
  }

  console.log(playlists);

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
    </div>
  )
};

export default Home;
