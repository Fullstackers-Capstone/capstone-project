import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../server/api/spotify';
import { catchErrors } from '../../server/api/utils';
import { getCurrentUserProfile } from '../../server/api/spotify';
import TopArtists from './TopArtists';

const Home = () => {

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
    <div>
    <TopArtists/>
    <div className="logout-container">
      <button className="StyledLogoutButton" onClick={logout}>Log Out</button>
    </div>
    </div>
  )
};

export default Home;
