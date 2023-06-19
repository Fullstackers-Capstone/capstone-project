import React, { useState, useEffect, useRef } from 'react';
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
import LandingPage from './LandingPage';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const App = () => {

  const [token, setToken] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  //const [activeSection, setActiveSection] = useState('');
  const [activeSection, setActiveSection] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [hide, setHide] = useState(true);
  const popupRef = useRef(null);
  
  const serverError = useSelector(state => state.serverError);

  const handleCloseModal = () => {
    dispatch({type: 'FIXED_SERVER_ERROR', payload: false})
};

const sections = ['About', 'How Does It Work?', 'Examples'];

const prev = () => {
  const currentIndex = sections.indexOf(activeSection);
  if (currentIndex > 0) {
    const previousSection = sections[currentIndex - 1];
    setActiveSection(previousSection);
  }
};

const next = () => {
  const currentIndex = sections.indexOf(activeSection);
  if (currentIndex < sections.length - 1) {
    const nextSection = sections[currentIndex + 1];
    setActiveSection(nextSection);
  }
};

const togglePopup = () => {
  setPopupVisible(!isPopupVisible);
  setActiveSection(null);
  setShowContent(false);
  setShowBackButton(false);
};

const closeOut = () => {
  setPopupVisible(!isPopupVisible);
}

const back = () => {
  setActiveSection(null);
  setShowContent(false);
};

const toggleSection = (section) => {
  setActiveSection(activeSection === section ? null : section);
  setShowContent(activeSection !== section);
  setShowBackButton(true);
};


const handleClickOutside = (event) => {
  if (popupRef.current && !popupRef.current.contains(event.target)) {
    setPopupVisible(false);
  }
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

  // const delay = () => {
  //   setTimeout(() => {
  //   }, 1000);
  //   return <LandingPage/>
  // }

  setTimeout(() => setHide(false), 350)

  if (!auth) {
    return null
  }

  return (
    <div>
      <header>
        <div className="nav">
          {token && <NavBar />}
          <div className="title">
            Serenade
            <i className="fa-brands fa-spotify" id="spotify-logo"></i>
          </div>
        </div>
        <div className="info-icon-container">
          <span className="info-icon" onClick={togglePopup}>
            <i className="fa-solid fa-circle-info"></i>
          </span>
        </div>
      </header>
      <div>
        {!token && (
          <>
            {!hide ? <LandingPage/> : ''}
          </>
        )}
        {token && (
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/unlock-pro" element={<UnlockPro />} />
              <Route path="/users/:id" element={<Profile />} />
              <Route path="/prompt" element={<Prompt />} />
              <Route path="/create" element={<PlaylistType />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-tracks" element={<TopTracks />} />
              <Route path="/playlists/:id" element={<SuccessfulPlaylist />} />
              <Route path="/landing" element={<LandingPage />} />
            </Routes>
            <div>
              {serverError.hasError && (
                <Modal errorMessage={serverError.message ? serverError.message : "Something went wrong"} handleClose={handleCloseModal} />
              )}
            </div>
          </div>
        )}
        {isPopupVisible && (
          <div className="popup-window" ref={popupRef}>
            <div className="popup-overlay" onClick={handleClickOutside}></div>
            <div className="popup-content">
            <div className="popup-close" onClick={closeOut}>×</div>
              <div className="main-title-container">
                <h2 className="main-title">Welcome to Serenade</h2>
                <div className="title-separator"></div>
              </div>
              {showContent ? (
                <div className="popup-section-content">
                  <div className="section-title-container">
                    <h3 className="section-title">{activeSection}</h3>
                  </div>
                  {activeSection === 'About' && (
                    <div className="example-line">
                      Serenade is an interactive app that harnesses the power of AI to create tailor-made playlists based on your mood.
                      <br />
                      <br />
                      Whether you're embarking on a road trip or need the right tunes for your Sunday chores, Serenade enables you to effortlessly curate personalized playlists by simply describing your desired ambiance.
                    </div>
                  )}
                  {activeSection === 'How Does It Work?' && (
                    <>
                    <div className="example-line">
                      Using Serenade is as simple as typing in the text bar. <br/> <br/> Just describe what you're looking for, such as "playlist for a long bike ride," and Serenade's powerful AI will curate a selection of tracks specifically tailored to your request.
                      <br />
                      <br />
                      Don't know where to start? Check out some examples by clicking on the right-pointing arrow below.
                    </div>
                    </>
                  )}
                  {activeSection === 'Examples' && (
                    <>
                      <div className="example-line">Looking for a playlist with songs that sounds similar to a specific song?  <br /> <br /> Try: "Songs similar to 'Sunday Morning' by Maroon 5"</div>
                      <div className="example-line">Looking for a playlist with songs from artists similar to those of a specific artist?     <br /><br />Try: "Songs from artists like JLO. Only include songs by artists that are not JLO."</div>
                      <div className="example-line">Looking for a playlist that helps you get through the work day?    <br /><br /> Try: "Uplifting songs for making it through the work day"</div>

                    </>
                  )}
{showBackButton && (
  <div className="popup-navigation">
    {activeSection !== 'About' && (
      <div className="popup-arrow" onClick={prev}>
        <FaChevronLeft />
      </div>
    )}
    <div className="popup-back-container">
      <div className="popup-back" onClick={back}>
        Back
      </div>
    </div>
    {activeSection !== 'Examples' && (
      <div className="popup-arrow" onClick={next}>
        <FaChevronRight />
      </div>
    )}
  </div>
)}
                </div>
              ) : (
                <div>
                  <div className="section" onClick={() => toggleSection('About')}>
                    <h3>About The App</h3>
                  </div>
                  <div className="section" onClick={() => toggleSection('How Does It Work?')}>
                    <h3>How Does It Work?</h3>
                  </div>
                  <div className="section" onClick={() => toggleSection('Examples')}>
                    <h3>Examples</h3>
                  </div>
                </div>
              )}
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