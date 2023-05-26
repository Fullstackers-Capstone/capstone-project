import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUserPlaylists, logout } from '../../server/api/spotify';
import { catchErrors } from '../../server/api/utils';
import { getCurrentUserProfile } from '../../server/api/spotify';
import TopArtists from './TopArtists';
import { createUser } from '../store'

const Home = () => {

  const { users } = useSelector(state => state);

  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  const dispatch = useDispatch();

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
    <div>
    <TopArtists/>
    <div className="logout-container">
      <button className="StyledLogoutButton" onClick={logout}>Log Out</button>
    </div>
    </div>
  )
};

export default Home;
