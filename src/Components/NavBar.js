import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '/server/api/spotify.js';
import { Squash as Hamburger } from 'hamburger-react';

const NavBar = () => {

  const { auth, playlists } = useSelector(state => state);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const mainMenu = useRef(null);

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
    setHamburgerOpen(!hamburgerOpen);
  };

  const closeMainMenu = (e) => {
    if(mainMenu.current && hamburgerOpen && !mainMenu.current.contains(e.target)){
      setHamburgerOpen(false);
      setDropdownVisible(false);
    }
  }

  document.addEventListener('mousedown', closeMainMenu)

  const authPlaylists = playlists.map(pl => pl)
  .filter(pl => pl.userId === auth.id)

  return(
    <div ref={ mainMenu } className={ `dropdown ${ dropdownVisible ? 'visible' : '' }` }>

      <div className='dropdown-toggle' onClick={ handleDropdownToggle }>
        <Hamburger toggled={ hamburgerOpen } toggle={ setHamburgerOpen } />
      </div>

      <div className="dropdown-content">

        <div id='dropdown-about'>
          <Link style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} to="/about" onClick={ handleDropdownToggle }>About</Link>
        </div>

        { auth.proUser ? (
          <Link to={ `/users/${ auth.id }` } onClick={ handleDropdownToggle }>
            Profile 
            <span style={{ color: 'gold', marginLeft: '.5rem' }}>
              <i className="fa-solid fa-circle-check fa-xs"></i>
            </span>
          </Link> 
        ) : (
          <Link to={`/users/${ auth.id }`} onClick={ handleDropdownToggle }>
            Profile
          </Link>
        ) }

        { auth.playlistCount > 0 ? (
          <Link to="/" onClick={ handleDropdownToggle }>
            My Playlists
          </Link>
        ) : '' }
        
        { authPlaylists.length > 4 && (!auth.proUser) ? (
          <Link to="/unlock-pro" onClick={ handleDropdownToggle }>
            Create Playlist
          </Link>
        ) : (
          <Link to="/prompt" onClick={ handleDropdownToggle }>
            Create Playlist
          </Link>
        ) }
        
        { auth.proUser ? '' 
        : (
          <Link to="/unlock-pro" onClick={ handleDropdownToggle }>
            Unlock Pro 
            <i className="fa-solid fa-lock fa-xs" style={{ marginLeft: '.5rem', color: 'gold' }}></i>
          </Link>
        ) }

        <Link onClick={ logout }>
          Logout
        </Link>

      </div>
    </div>
  );
};

export default NavBar;