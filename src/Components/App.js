import React, { useState, useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import { BsSpotify } from 'react-icons/bs';
import { accessToken, logout } from '/server/api/spotify.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Routes, Route } from 'react-router-dom';
import { fetchUsers, fetchSpotUser,getAllPrompts, fetchPlaylists } from '../store';
import Profile from './Profile';
import Contact from './Contact';
import NavBar from './NavBar';
import Prompt from './Prompt';
import Discover from './Discover';
import PlaylistType from './PlaylistType';
import UnlockPro from './UnlockPro';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';

const App = () => {

  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  
  useEffect(() => {

    const loginWithSpotify = async() => {
      await dispatch(fetchSpotUser());
      await setToken(accessToken);
      await dispatch(getAllPrompts());
      await dispatch(fetchPlaylists());
    }

    loginWithSpotify();

  }, [dispatch]);

  if (!auth) {
    return null
  }

  return (
    <div>
      <header>
        <div className="nav">
        {token && (
            <NavBar/>
          )}
          <div className="title">
            Serenade
            <i className="fa-brands fa-spotify" id='spotify-logo'></i>
            {/* <BsSpotify /> */}
          </div>
        </div>
      </header>
        <div>
          {!token && <Login/>}
          {token && (
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/unlock-pro" element={<UnlockPro/>}/>
                <Route path="/users/:id" element={<Profile />}/>
                <Route path="/prompt" element={<Prompt />}/>
                <Route path="/create" element={<PlaylistType />}/>
                <Route path="/discover" element={<Discover />}/>
                <Route path="/top-artists" element={<TopArtists />}/>
                <Route path="/top-tracks" element={<TopTracks />}/>
              </Routes>
            </div>
          )}
        </div>
    </div>
  );
}

export default App;

/*


import React, { useState, useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import { BsSpotify } from 'react-icons/bs';
import { accessToken, logout } from '/server/api/spotify.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Routes, Route } from 'react-router-dom';
import { fetchUsers, fetchSpotUser,getAllPrompts, fetchPlaylists } from '../store';
import Profile from './Profile';
import Contact from './Contact';
import NavBar from './NavBar';
import Prompt from './Prompt';
import Discover from './Discover';
import PlaylistType from './PlaylistType';
import UnlockPro from './UnlockPro';

const App = () => {

  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  
  useEffect(() => {

    const loginWithSpotify = async() => {
      await dispatch(fetchSpotUser());
      await setToken(accessToken);
      await dispatch(getAllPrompts());
      await dispatch(fetchPlaylists());
    }

    loginWithSpotify();

  }, [dispatch]);

  if (!auth) {
    return null
  }

  return (
    <div>
      <header>
        <div className="nav">
        {token && (
            <NavBar/>
          )}
          <div className="title">
            Serenade
            <i className="fa-brands fa-spotify" id='spotify-logo'></i>
            </div>
            </div>
          </header>
            <div>
              {!token && <Login/>}
              {token && (
                <div>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/unlock-pro" element={<UnlockPro/>}/>
                    <Route path="/users/:id" element={<Profile />}/>
                    <Route path="/prompt" element={<Prompt />}/>
                    <Route path="/create" element={<PlaylistType />}/>
                    <Route path="/discover" element={<Discover />}/>
                  </Routes>
                </div>
              )}
            </div>
        </div>
      );
    }
    
    export default App;




*/
