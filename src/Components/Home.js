import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../server/api/spotify';
import { createUser } from '../store'
import Searcher from './Searcher';
const Home = () => {

  const { users, auth } = useSelector(state => state);
  const [selectedUser, setSelectedUser] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const user = users.find(user => user.spotifyId === auth.id);
    if(user){
        setSelectedUser(user);
    } else {
      const email = auth.email;
      const spotifyId = auth.id;
      dispatch(createUser({ email, spotifyId }));
    }
    }, [auth])

  if(!selectedUser){
    return null;
  }

  return(
    <div className='App'>
      <Searcher/>
    </div>
  )
};

export default Home;
