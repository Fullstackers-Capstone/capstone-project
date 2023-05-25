import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../server/api/spotify';

const Home = () => {
  return(
    <div className="logout-container">
      <button className="StyledLogoutButton" onClick={logout}>Log Out</button>
    </div>
  )
};

export default Home;
