import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '/server/api/spotify.js';
import { Squash as Hamburger } from 'hamburger-react';

const NavBar = () => {

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [hamburgerOpen, setHambugerOpen] = useState(false);

    const { auth } = useSelector(state => state);

    const handleDropdownToggle = () => {
        setDropdownVisible(!dropdownVisible);
        setHambugerOpen(!hamburgerOpen);
      };
    return(
        <div className={`dropdown ${dropdownVisible ? 'visible' : ''}`}>
        <div className='dropdown-toggle' onClick={handleDropdownToggle}>
          <Hamburger toggled={hamburgerOpen} toggle={setHambugerOpen}/>
        </div>
        <div className="dropdown-content">
            <Link to="/" onClick={handleDropdownToggle}>Home</Link>
            <Link to={`/users/${auth.id}`} onClick={handleDropdownToggle}>Profile</Link>
            <Link to="/create" onClick={handleDropdownToggle}>Create Playlist</Link>
            <Link to="/prompt" onClick={handleDropdownToggle}>Prompt</Link>
            <Link to="/unlock-pro" onClick={handleDropdownToggle}>Unlock Pro <i className="fa-solid fa-lock fa-xs" style={{marginLeft: '.25rem'}}></i></Link>
            <Link onClick={logout}>Logout</Link>
        </div>
      </div>
    )
}

export default NavBar;