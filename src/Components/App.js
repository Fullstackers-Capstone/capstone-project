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
import Playlist from './Playlist';
import Modal from './Modal';
import SuccessfulPlaylist from './SuccessfulPlaylist';

const App = () => {

  const [token, setToken] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const serverError = useSelector(state => state.serverError);

  const handleCloseModal = () => {
    dispatch({type: 'FIXED_SERVER_ERROR', payload: false})
};

const togglePopup = () => {
  setPopupVisible(!isPopupVisible);
};

const toggleSection = (section) => {
  setActiveSection(activeSection === section ? null : section);
};

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
        <div className="info-icon-container">
    <span className="info-icon" onClick={togglePopup}>
      &#9432;
    </span>
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
                <Route path="/playlist" element={<Playlist/>}/>
                <Route path="/discover" element={<Discover />}/>
                <Route path="/top-artists" element={<TopArtists />}/>
                <Route path="/top-tracks" element={<TopTracks />}/>
                <Route path='/playlists/:id' element={<SuccessfulPlaylist/>}/>
              </Routes>
              <div>
             
              {serverError.hasError && <Modal errorMessage={serverError.message ? serverError.message : "Something went wrong"} handleClose={handleCloseModal}/>}
              </div>
            </div>
          )}
                  {isPopupVisible && (
                    <div className="popup-window">
                    <div className="popup-content">
                      <h2 className="main-title">Welcome to Serenade</h2>
                      <div className="section" onClick={() => toggleSection('about')}>
                        <h3 className={activeSection === 'about' ? 'active' : ''}>About the App</h3>
                        {activeSection === 'about' && (
                          <p>
                            Serenade is an innovative app that harnesses the power of AI to create tailor-made playlists based on your mood. Whether you're embarking on a road trip or in need of a calming melody, Serenade enables you to effortlessly curate personalized playlists by simply describing your desired ambiance. Let Serenade be your musical companion, harmonizing your emotions and delivering the perfect playlist for any moment. Immerse yourself in a world of serenades and experience the magic of music like never before.
                          </p>
                          
                        )}
                      </div>
                      <div className="section" onClick={() => toggleSection('how')}>
  <h3 className={activeSection === 'how' ? 'active' : ''}>How Does it Work?</h3>
  {activeSection === 'how' && (
    <div className="section-content">
      <p>
        Using Serenade is as simple as typing in the text bar. Whether you have an upcoming road trip, a relaxing evening at home, or any other occasion in mind, you can effortlessly create a playlist that matches your desired mood. Just describe what you're looking for, such as "playlist for a long bike ride," and Serenade's powerful AI will curate a selection of tracks specifically tailored to your request.
      </p>
    </div>
  )}
</div>
<div className="section" onClick={() => toggleSection('examples')}>
  <h3 className={activeSection === 'examples' ? 'active' : ''}>Examples</h3>
  {activeSection === 'examples' && (
    <div className="section-content">
      <div className="example-line">If looking for a playlist that sounds similar to a specific song? Try something like: "Songs similar to 'Sunday Morning' by Maroon 5"</div>
      <div className="example-line">If looking for a playlist with songs from artists similar to those of a specific artist? Try something like: "Songs from artists like JLO. Only include songs by artists that are not JLO."</div>
    </div>
  )}
</div>
<div className="popup-close" onClick={togglePopup}>
  Close
</div>

                    </div>
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
