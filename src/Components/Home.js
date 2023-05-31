import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../server/api/spotify';
import { createUser } from '../store'
import Searcher from './Searcher';
import Prompt from './Prompt';
const Home = () => {

const Home = () => {
  const { users, auth } = useSelector(state => state);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const user = users.find(user => user.spotifyId === auth.id);
    if(!user && !isCreatingUser){
      setIsCreatingUser(true);
      const email = auth.email;
      const spotifyId = auth.id;
      dispatch(createUser({ email, spotifyId }));
    }
  }, [users, auth.id, dispatch, isCreatingUser]);

  const selectedUser = users.find(user => user.spotifyId === auth.id);

  if(!selectedUser){
    return null;
  }

  return(
    <div className='App'>
    <div className="logout-container">
      <button className="StyledLogoutButton" onClick={logout}>Log Out</button>
      <Link to={`/users/${selectedUser.id}`}>Profile</Link>
    </div>
    </div>
  )
};

export default Home;
