import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUserPlaylists, logout } from '../../server/api/spotify';
import { catchErrors } from '../../server/api/utils';
import { getCurrentUserProfile } from '../../server/api/spotify';
import { createUser } from '../store'
import Artists from './Artists';
import Searcher from './Searcher';

const Home = () => {

  const { users, auth } = useSelector(state => state);

  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  const dispatch = useDispatch();

  const user = users.find(user => user.spotifyId === auth.id);

  console.log(auth);

  useEffect(() => {
    // console.log(user);
      if(!user){
        const email = auth.email;
        const spotifyId = auth.id
        dispatch(createUser({ email, spotifyId }))   
        }
  }, [auth])

  if(!user){
    return null;
  }

  return(
    <div className='App'>
    <div className="logout-container">
      <button className="StyledLogoutButton" onClick={logout}>Log Out</button>
      <Link to={`/users/${user.id}`}>Profile</Link>
    </div>
    <Searcher/>
    </div>
  )
};
export default Home;