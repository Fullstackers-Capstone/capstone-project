import React, { useState, useEffect, useRef } from 'react';

import { accessToken } from '/server/api/spotify.js';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { fetchSpotUser,getAllPrompts, fetchPlaylists } from '../store';

import Profile from './Profile';
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
import About from './About';
import Home from './Home';

const App = () => {

  const [token, setToken] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [hide, setHide] = useState(true);
  
  const serverError = useSelector(state => state.serverError);

  setTimeout(() => setHide(false), 350)

  const handleCloseModal = () => {
    dispatch({ type: 'FIXED_SERVER_ERROR', payload: false })
  };

  const infoMenu = useRef(null);

  const closeInfoMenu = (e) => {
    if(infoMenu.current && isPopupVisible && !infoMenu.current.contains(e.target)){
      setPopupVisible(false);
    }
  }

  document.addEventListener('mousedown', closeInfoMenu)

  const sections = ['How It Works', 'Examples'];

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
    setActiveSection(null);
    setShowContent(false);
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
          {token && <NavBar />}
          <div className={token ? 'title' : 'landing-title'}>
            Serenade
            <img id='spotify-logo' src='/static/favicon/android-chrome-512x512.png'/>
          </div>
        </div>
          {token && (
            <div className="info-icon-container">
              <span className="info-icon" onClick={togglePopup}>
                <i className="fa-solid fa-circle-info fa-xs"></i>
              </span>
            </div>
          )}

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
              {
                auth.playlistCount > 0 ? <Route path="/" element={ <Home /> } /> : <Route path="/" element={ <Prompt /> } />
              }
              <Route path="/unlock-pro" element={ <UnlockPro /> } />
              <Route path="/users/:id" element={ <Profile /> } />
              <Route path="/prompt" element={ <Prompt /> } />
              <Route path="/create" element={ <PlaylistType /> } />
              <Route path="/playlist" element={ <Playlist /> } />
              <Route path="/discover" element={ <Discover /> } />
              <Route path="/top-artists" element={ <TopArtists /> } />
              <Route path="/top-tracks" element={ <TopTracks /> } />
              <Route path="/playlists/:id" element={ <SuccessfulPlaylist /> } />
              <Route path="/landing" element={< LandingPage /> } />
              <Route path="/about" element={ <About /> } />
            </Routes>

            <div>
              {serverError.hasError && (
                <Modal errorMessage={serverError.message ? serverError.message : "Something went wrong"} handleClose={handleCloseModal} />
              )}
            </div>

          </div>
        )}

        {isPopupVisible && (
          <div className="modalBackground" id='info-popup'>
            <div ref={infoMenu} className='modalOuterContainer'>
              <div className='info-title-container'>
                <div className='info-title'>{ activeSection || <span>About <span style={{ color: 'white' }}>Serenade</span></span> }
                </div>
                <div className='info-title' id='info-close'>
                  <i onClick={closeOut} className="fa-solid fa-circle-xmark fa-2xs"></i>
                </div>
              </div>

              <div className="modalContainer" id='info-outer-container'>

                {showContent ? (
                  <div className="popup-section-content">

                    {activeSection === 'How It Works' && (
                      <>
                        <div className="steps-container">

                          <div className="info-inner-container" style={{marginTop: 0}}>
                            <div className="feature-header" id='info-header'>
                              <div className='step-num-title'>
                                <span className='step-number'>
                                  Step 1
                                  <span className='step-colon'>:</span>
                                </span> 
                                <span className='step-title'>
                                  Click 'Create Playlist' & Enter a Prompt
                                </span>
                              </div>
                            </div>
                            <p className="p-landing">
                              Start by telling us what kind of music you're in the mood for. Want something to get you pumped for a workout, or maybe a calming playlist for studying? Just let us know!
                            </p>
                          </div>

                          <div className="info-inner-container">
                            <div className="feature-header" id='info-header'>
                              <div className='step-num-title'>
                                <span className='step-number'>
                                  Step 2
                                  <span className='step-colon'>:</span>
                                </span> 
                                <span className='step-title'>
                                  Select the Songs You Like
                                </span>
                              </div>
                            </div>
                            <p className="p-landing">
                              We'll generate a playlist tailored to your prompt. From this selection, you can personally curate your final playlist, choosing the songs that resonate most with you.
                            </p>
                          </div>

                          <div className="info-inner-container">
                            <div className="feature-header" id='info-header'>
                              <div className='step-num-title'>
                                <span className='step-number'>
                                  Step 3
                                  <span className='step-colon'>:</span>
                                </span> 
                                <span className='step-title'>
                                  Launch & Share Playlists
                                </span>
                              </div>
                            </div>
                            <p className="p-landing">
                              Once you're happy with your playlist, you can save it to your Spotify account with a single click. Share your unique playlists with your friends!
                            </p>
                          </div>

                          <div className="popup-back-container">
                            <div className="popup-back" onClick={back}>
                              Back
                            </div>
                          </div>

                        </div>
                      </>
                    )}

                    {activeSection === 'Examples' && (
                      <>

                        <div className="steps-container">

                          <div className="info-inner-container" style={{marginTop: 0}}>
                            <div className="feature-header" id='info-header'>
                              <div className='step-num-title'>
                                <span className='step-number'>
                                  "Songs similar to 'Sunday Morning' by Maroon 5"
                                </span>
                              </div>
                            </div>
                            <p className="p-landing">
                              Looking for a playlist with music that sounds similar to a specific song? Give the AI clear instructions along with the artist & song name you have in mind.
                            </p>
                          </div>

                          <div className="info-inner-container">
                            <div className="feature-header" id='info-header'>
                              <div className='step-num-title'>
                                <span className='step-number'>
                                  "Songs from artists like JLO. Only include songs by artists that are not JLO."
                                </span>
                              </div>
                            </div>
                            <p className="p-landing">
                              Be specific when you want to exclude certain results from your playlist.
                            </p>
                          </div>

                          <div className="info-inner-container">
                            <div className="feature-header" id='info-header'>
                              <div className='step-num-title'>
                                <span className='step-number'>
                                  "Uplifting songs for making it through the work day"
                                </span>
                              </div>
                            </div>
                            <p className="p-landing">
                              Just want to capture a mood? Try putting it into words and see how Serenade performs.
                            </p>
                          </div>

                          <div className="popup-back-container">
                            <div className="popup-back" onClick={back}>
                              Back
                            </div>
                          </div>

                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className='info-container'>

                    <div className='info-about-serenade' style={{marginTop: '1rem'}}>
                      Serenade is an interactive app that harnesses the power of AI to create tailor-made playlists based on your mood.
                    </div>

                    <div className='info-about-serenade' style={{marginBottom: '2rem'}}>
                      Whether you're embarking on a road trip or need the right tunes for your Sunday chores, Serenade enables you to effortlessly curate personalized playlists by simply describing your desired ambiance.
                    </div>

                    <div className="info-inner-container" id='info-links' onClick={() => toggleSection('How It Works')}>
                      <span>
                        <i className="fa-solid fa-gears" style={{color: 'gold', marginRight: '.5rem'}}></i>
                        How It Works
                      </span>
                    </div>

                    <div className="info-inner-container" id='info-links' onClick={() => toggleSection('Examples')}>
                      Examples
                    </div>

                  </div>
                )}

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;