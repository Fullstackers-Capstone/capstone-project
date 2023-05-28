import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getResponse } from '../store';
import { getCurrentUserPlaylists, logout } from '../../server/api/spotify';
import { catchErrors } from '../../server/api/utils';
import { createUser } from '../store'
import Artists from './Artists';
import Searcher from './Searcher';
import Prompt from './Prompt';

const Home = () => {
  const dispatch= useDispatch();
  const { users,prompt } = useSelector(state => state);
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getCurrentUserProfile();
      const user = users.map(user => user.spotifyId)
      console.log(user);

      console.log(userProfile.data);
      const email = userProfile.data.email;
      const spotifyId = userProfile.data.id;
      const followerCount = userProfile.data.followers.total;
      const avatar = userProfile.data.images[0].url;

      await dispatch(createUser({ email, spotifyId, followerCount, avatar}))

      const userPlaylists = await getCurrentUserPlaylists();
      console.log(userPlaylists.data);
      setPlaylists(userPlaylists.data);
      setProfile(userProfile.data);
    }

    catchErrors(fetchData());
  }, []);

  return(
    <div className='App'>
    <div className="logout-container">
      <button className="StyledLogoutButton" onClick={logout}>Log Out</button>
    </div>
    <Searcher/>
    <Prompt/>
    </div>
  )
};
export default Home;