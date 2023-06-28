import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '/server/api/spotify.js';
import { Pivot as Hamburger } from 'hamburger-react'
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

    // const authPlaylists = playlists.map(pl => pl)
    // .filter(pl => pl.userId === auth.id)

    return(
        <div className={`dropdown ${dropdownVisible ? 'visible' : ''}`}>
        <div className='dropdown-toggle' onClick={handleDropdownToggle}>
          <Hamburger size={20} direction={'right'} toggled={hamburgerOpen} toggle={setHambugerOpen}/>
        </div>
        <div className="dropdown-content">

            <Link to="/about" onClick={handleDropdownToggle}>Open in Spotify App</Link>

          <Link to={`/users/${auth.id}`} onClick={handleDropdownToggle}>Copy Link</Link>

            <Link to="/" onClick={handleDropdownToggle}>Remove Playlist</Link>
           
        </div>
      </div>
    )
}

export default NavBar;