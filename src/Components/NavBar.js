import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '/server/api/spotify.js';

const NavBar = () => {

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const { auth } = useSelector(state => state);

    const handleDropdownToggle = () => {
        setDropdownVisible(!dropdownVisible);
      };
    return(
        <div className={`dropdown ${dropdownVisible ? 'visible' : ''}`}>
        <button className="dropdown-toggle" onClick={handleDropdownToggle}>
          Navigation
        </button>
        <div className="dropdown-content">
          <Link to="/" onClick={handleDropdownToggle}>Home</Link>
          <Link to={`/users/${auth.id}`} onClick={handleDropdownToggle}>Profile</Link> {/* Replace `:id` with `auth.id` */}
          <Link to="/contact" onClick={handleDropdownToggle}>Contact</Link>
          <Link onClick={logout}>Logout</Link>
        </div>
      </div>
    )
}

export default NavBar;