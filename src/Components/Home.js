import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getResponse } from '../store';
import { logout } from '../../server/api/spotify';
import { catchErrors } from '../../server/api/utils';
import { getCurrentUserProfile } from '../../server/api/spotify';

const Home = () => {
  const dispatch= useDispatch();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data); 
    }

    catchErrors(fetchData());
  }, []);

  console.log(window.localStorage);

  return(
    <div className="logout-container">
      <button className="StyledLogoutButton" onClick={logout}>Log Out</button>
      <button className="StyledLogoutButton" onClick={() => {dispatch(getResponse('hi chatgpt'))}}>Test</button>
    </div>
  )
};

export default Home;
