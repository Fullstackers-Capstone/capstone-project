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
import Playlist from './Playlist';

const Home = () => {

  const { auth } = useSelector(state => state);
  const [selected, setSelected] = useState(true);

  // Mocked data for Playlist components
  const playlists = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Replace this with your real data

  if(!auth){
    return null;
  }

  return (
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
      <div className="playlist-grid">
        {playlists.map((playlist) => (
          <Playlist key={playlist} playlist={playlist} /> // Add your actual playlist data
        ))}
      </div>
      <CreatePlaylistButton />
    </div>
  )
};

export default Home;

// const Home = () => {

//   const { auth } = useSelector(state => state);
//   const [selected, setSelected] = useState(true);

//   if(!auth){
//     return null;
//   }

//   return(

//     <div id='content-body'>
//       <div id='pl-discover-toggle-container'>
//         <div className="toggle-button">
//           <button 
//             className={`toggle-option ${(selected) ? 'selected' : ''}`} 
//             onClick={() => setSelected(!selected)}
//           >
//             My Playlists
//           </button>
//           <button 
//             className={`toggle-option ${(!selected) ? 'selected' : ''}`} 
//             onClick={() => setSelected(!selected)}
//           >
//             Discover
//           </button>
//         </div>
//       </div>
//       {(selected) ? <MyPlaylists/> : <Discover/>}
//       <Playlist />
//       <CreatePlaylistButton />
//     </div>
//   )
// };

// export default Home;
