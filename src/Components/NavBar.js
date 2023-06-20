import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '/server/api/spotify.js';
import { Squash as Hamburger } from 'hamburger-react';
import { fetchPlaylists } from '../store';

const NavBar = () => {

  const { auth, playlists } = useSelector(state => state);

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [hamburgerOpen, setHambugerOpen] = useState(false);

    const dispatch = useDispatch();

    const handleDropdownToggle = () => {
        setDropdownVisible(!dropdownVisible);
        setHambugerOpen(!hamburgerOpen);
      };

    const authPlaylists = playlists.map(pl => pl)
    .filter(pl => pl.userId === auth.id)

    return(
        <div className={`dropdown ${dropdownVisible ? 'visible' : ''}`}>
        <div className='dropdown-toggle' onClick={handleDropdownToggle}>
          <Hamburger toggled={hamburgerOpen} toggle={setHambugerOpen}/>
        </div>
        <div className="dropdown-content">

            <span className='dropdown-about'><Link to="/" onClick={handleDropdownToggle}>About</Link></span>

            {auth.proUser ? <Link to={`/users/${auth.id}`} onClick={handleDropdownToggle}>Profile <span style={{color: 'gold', marginLeft: '.15rem'}}><i className="fa-solid fa-circle-check fa-xs"></i></span></Link> : <Link to={`/users/${auth.id}`} onClick={handleDropdownToggle}>Profile</Link>}

            {auth.playlistCount > 0 ? <Link to="/" onClick={handleDropdownToggle}>My Playlists</Link> : ''}
           
            
            {authPlaylists.length > 4 && (!auth.proUser) ? <Link to="/unlock-pro" onClick={handleDropdownToggle}>Create Playlist</Link> : <Link to="/prompt" onClick={handleDropdownToggle}>Create Playlist</Link>}
            
            {
              auth.proUser ? "" : <Link to="/unlock-pro" onClick={handleDropdownToggle}>Unlock Pro <i className="fa-solid fa-lock fa-xs" style={{marginLeft: '.25rem', color: 'gold'}}></i></Link>
            }

            <Link onClick={logout}>Logout</Link>
        </div>
      </div>
    )
}

export default NavBar;